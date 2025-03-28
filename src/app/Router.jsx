import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Profile from '../pages/Auth/Profile';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import CreateEvent from '../pages/Events/CreateEvent';
import DetailsEvent from '../pages/Events/DetailsEvent';
import Events from '../pages/Events/Events';


const Router = () => (
    <BrowserRouter>
        <Routes>   
            <Route index element={<Events/>} />
            <Route path="/sign-in" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/create-event" element={<CreateEvent/>} />
            <Route path="/events/:id" element={<DetailsEvent/>} />
            <Route path="/profile/:uuid" element={<Profile/>} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    </BrowserRouter>
);

export default Router;