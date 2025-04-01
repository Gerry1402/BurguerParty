import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useAuth } from './useAuthContext';
import { Spinner } from 'react-bootstrap';
import Layout from '../../components/Layout';

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
        return (
                <div className="d-flex w-100 justify-content-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
        );
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
