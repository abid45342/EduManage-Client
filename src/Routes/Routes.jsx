

import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/AdminPages/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TeacherRequest from "../pages/TeacherRequest";
import TeacherApproval from "../pages/AdminPages/TeacherApproval";
import AddClass from "../pages/TeacherPages/AddClass";
import MyClasses from "../pages/TeacherPages/MyClasses";
import AllClassesRequest from "../pages/AdminPages/AllClassesRequest";
import AllClasses from "../pages/AllClasses";
import ClassDetails from "../pages/ClassDetails";
import Payment from "../pages/Payment/Payment";
import MyEnroll from "../pages/StudentPages/MyEnroll";
import ClassSeeDetails from "../pages/TeacherPages/ClassSeeDetails";
import MyEnrollClassDetails from "../pages/StudentPages/MyEnrollClassDetails";
import MyProfile from "../pages/MyProfile";
import TeacherRoute from "./TeacherRoute";
import StudentRoute from "./StudentRoute";
import ErrorPage from "../pages/Error";





  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:'/',
        element:<Home></Home>
        },
        {
         
            path:'/signUp',
            element:<SignUp></SignUp>
          
        },
        {
          path:'/login',
          element:<Login></Login>
        }
        ,{
          path:'/teacherReq',
          element:<PrivateRoute><TeacherRequest></TeacherRequest></PrivateRoute>
        },
        {
          path:'/allClasses',
          element:<AllClasses></AllClasses>
        },
        {
          path:'/class/:id',
          element:<PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
        },

      ]

    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'/dashboard/users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'/dashboard/teacherRequest',
          element:<AdminRoute><TeacherApproval></TeacherApproval></AdminRoute>

        },
        {
          path:'/dashboard/classReq',
          element:<AdminRoute><AllClassesRequest></AllClassesRequest></AdminRoute>

        },
        {
          path:'/dashboard/addClass',
          element:<TeacherRoute> <AddClass></AddClass></TeacherRoute>
        },
        {
          path:'/dashboard/myClass',
          element:<TeacherRoute><MyClasses></MyClasses></TeacherRoute>
        }
        ,{
          path:'/dashboard/payment/:id',
          element: <Payment></Payment>

        },
        {
          path:'/dashboard/myEnroll',
          element:<StudentRoute><MyEnroll></MyEnroll></StudentRoute>
        },
        {
          path: '/dashboard/my-class/:id',
          element: <ClassSeeDetails></ClassSeeDetails>
        },
        {
          path:"/dashboard/myenroll-class/:classId" ,
          element:  <StudentRoute><MyEnrollClassDetails></MyEnrollClassDetails></StudentRoute>

        }
,{
  path:"/dashboard/myProfile",
  element:<MyProfile></MyProfile>
}
      ]
    },
    // {
    //   path:'dashboard',
    //   element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    // },
    {
      path:"*",
      element:<ErrorPage></ErrorPage>
    }

  ]);