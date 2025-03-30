import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth/useAuth";

const Auth = () => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default Auth;
