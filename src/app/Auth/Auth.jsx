import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuthContext';

const Auth = () => {

    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default Auth;
