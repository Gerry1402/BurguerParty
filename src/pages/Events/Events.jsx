import { Button, Card, Container } from 'react-bootstrap';
import supabase from '../../services/public';
import SignOut from '../../components/SignOut';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';

const Events = () => {

    const [user, setUser] = useState(null);
    const [events, setEvents] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error al obtener el usuario:", error);
                return;
            }
            console.log("Usuario logueado:", data.user);
            setUser(data.user);

        };

        const fetchEvents = async () => {
            const { data, error } = await supabase
            .from('events')
            .select("*");

            if (error) {
                console.error("Error al obtener el usuario:", error);
            return;
            }

            console.log("Eventos:", data);
            setEvents(data.user);
        }

        fetchUser();
        fetchEvents();
    }, []);
    

    return (
        <>

        <Container>
            <p className='h1'>Listado de eventos</p>
            {events ? (
                <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
                
            ) : (
                <p>Cargando eventos...</p>
            )}
            
        </Container>



        {user ? (
                <Link to={`/profile/${user.id}`}>
                    <Button>Show User</Button>
                </Link>
                
            ) : (
                <p>Cargando usuario...</p>
            )}
            <SignOut />
        </>
    );
};

export default Events;
