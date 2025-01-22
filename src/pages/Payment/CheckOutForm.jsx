import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckOutForm = ({classDetails}) => {
  const navigate = useNavigate();
  console.log(classDetails)
  const axiosSecure= useAxiosSecure();
  const [error,setError]=useState('')
    const stripe = useStripe();
    const elements = useElements();
    const price = classDetails.price;
    const[clientSecret,setClientSecret]=useState('');
    const {user}=useAuth();
    const [transactionId, setTransactionId] = useState('');



    useEffect(()=>{   
      console.log(user)  

     axiosSecure.post('/create-payment-intent',{price:price})
     .then(res=>{
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
     })

    },[axiosSecure,price,user])     
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return
   
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
          }
          const {error,paymentMethod}= await stripe.createPaymentMethod({
            type:'card',
            card
          })
          if(error){
            console.log('payment error',error)
            setError(error.message)
          }
          else{
            console.log('paymentMethod',paymentMethod)
            setError('');
          }
          const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
              card:card,
              billing_details:{
                email:user.email || 'anynomus',
                name:user?.displayName || 'anonymous'
               

              }
            }
          })
          if(confirmError){
            console.log('confirm error',confirmError) 
              
          
          }
          else{ 
            console.log('paymentIntent',paymentIntent)
            if(paymentIntent.status==='succeeded')
            {
              console.log('transaction id',paymentIntent.id)
              setTransactionId(paymentIntent.id);
              const enrollInfo ={
                email:user.email,
                transactionId:paymentIntent.id,
                classDetails:classDetails,
                date:new Date()

             
              }
              const res = axiosSecure.post('/allEnroll',enrollInfo);
              console.log('payment saved to database',res);
              navigate('/dashboard/myEnroll')
              toast.success('Payment successful')
            }
          }  
     
    }
    return (
        <form onSubmit={handleSubmit} action="">
             <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary mt-4' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button >
      <p className='text-red-500'>{error}</p>
      {transactionId && <p className="text-green-600">your transaction id : {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;