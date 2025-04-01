import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import supabase from "../../services/supabase";
// import {useAuth} from '../../app/Auth/useAuthContext';




const Profile = () => {

    

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            console.log("Obteniendo todos los usuarios...");

            const { data, error } = await supabase.auth.admin.listUsers();

            if (error) {
                console.error("Error al obtener usuarios:", error);
                return;
            }

            console.log("Usuarios obtenidos:", data.users);
            setUsers(data.users);
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Container>
            <h1>Lista de Usuarios</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <strong>Email:</strong> {user.email} <br />
                            <strong>UID:</strong> {user.id} <br />
                            <strong>Nombre:</strong> {user.user_metadata?.name || "No disponible"}
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando usuarios...</p>
            )}
        </Container>


        </>
    );
}

export default Profile;