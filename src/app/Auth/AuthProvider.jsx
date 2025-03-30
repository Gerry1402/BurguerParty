import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';
import supabase from '../../services/supabase';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Revisar sesión activa
        const checkUser = async () => {
            const {
            data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };

        checkUser();

        // Escuchar cambios en la sesión
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
