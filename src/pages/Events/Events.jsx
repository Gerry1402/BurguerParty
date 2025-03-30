import { Button } from 'react-bootstrap';
import supabase from '../../services/supabase';
import SignOut from '../../components/SignOut';

const Events = () => {
    const handleClick2 = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        console.log(user);
    };
    return (
        <>
            <SignOut />
            <Button onClick={handleClick2}>Get User</Button>
        </>
    );
};

export default Events;
