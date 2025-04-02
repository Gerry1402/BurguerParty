import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './Auth/AuthProvider';
import Auth from './Auth/Auth';
import CreateEvent from '../pages/Events/CreateEvent';
import DetailsEvent from '../pages/Events/DetailsEvent';
import Events from '../pages/Events/Events';
import Profile from '../pages/Auth/Profile';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Public from './Auth/Public';

const Router = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* Protected Routes */}
                <Route element={<Auth />}>
                    <Route index element={<Events />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/events/:id" element={<DetailsEvent />} />
                    <Route path="/profile/:uuid" element={<Profile />} />
                </Route>
                {/* Public Routes */}
                <Route element={<Public />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default Router;
