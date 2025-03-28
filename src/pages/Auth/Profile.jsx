import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const supabaseUrl = "https://apwvdicuxcbvlhqcjpld.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Profile = () => {

    const {uuid} = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Buscando usuario con ID:", uuid);
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("uid", uuid)
                .single();

                

            if (error) {
                console.error("Error fetching user:", error);
            } else {
                console.log("Datos del usuario:", data);
                setUserData(data);
            }
        };

        if (uuid) {
            fetchUser();
        }
    }, [uuid]);

    return (
        <>
            <Container>
                <h1>Profile</h1>
                {userData ? (
                <div>
                    <p><strong>Nombre:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
                

            </Container>
        </>
    );
}

export default Profile;
