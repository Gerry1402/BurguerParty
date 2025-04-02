import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useAuth } from './useAuthContext';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';

const Auth = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time - replace with actual async operation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust delay as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading/>
    }

    return user ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Navigate to="/signin" replace />
    );
};
export default Auth;
