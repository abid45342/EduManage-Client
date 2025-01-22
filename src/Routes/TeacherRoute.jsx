import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";

const TeacherRoute = ({ children }) => {
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
    if (user && role==='teacher') {
        return children;
    }

    // Redirect to login if not authorized
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default TeacherRoute;
