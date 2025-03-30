import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import supabase from '../../services/supabase/supabase';
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Revisar sesión activa
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data?.session?.user || null);
            setLoading(false);
        };

        checkUser();

        // Escuchar cambios en la sesión
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user || null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}
export { AuthContext };
