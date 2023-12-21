import React, {useContext, useEffect} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from './contexts/mongoAuthContext'

const ProtectedRoutes = () => {

    const context = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (!context.isAuthenticated) {
            context.setRedirectPath(location.pathname);
        }
    }, [context.isAuthenticated, location, context.setRedirectPath]);

    return context.isAuthenticated === true ? (
        <Outlet />
    ) : (
        <Navigate to='/user/login' replace state={{ from: location }}/>
    );
};

export default ProtectedRoutes;
