// import { Navigate, useLocation } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";
// import useAuth from "../hooks/useAuth";
// import { AuthContext } from "../providers/AuthProvider";
// import { useContext } from "react";



// const AdminRoute = ({children}) => {
//     // const {user,loading}= useAuth();
//     const {user,loading}=useContext(AuthContext)
//     const [isAdmin,isAdminLoading]= useAdmin();
//     const location = useLocation();
//     console.log(isAdmin)
//     if(loading ||isAdminLoading ){
//         return <progress className="progress w-56"></progress>
//     }
//     if(user)
//     {
//         return children
//     }
//     return   <Navigate to="/login" state={{from: location}} replace></Navigate>

// };

// export default AdminRoute;






import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isLoading] = useRole();
    const location = useLocation();
   console.log(role)

    // Show loading indicator if data is still being fetched
    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    // Check if the user exists and is an admin
    if (user && role==='admin') {
        return children;
    }

    // Redirect to login if not authorized
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default AdminRoute;
