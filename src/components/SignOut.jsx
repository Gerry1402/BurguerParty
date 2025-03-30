import supabase from "../services/supabase/supabase";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const SignOut = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/signin", { replace: true });
    };
    return (
        <Button variant="danger" onClick={handleLogout}>
            Cerrar sesión
        </Button>
    );
};

export default SignOut;
