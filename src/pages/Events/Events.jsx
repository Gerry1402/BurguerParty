import { Button, Card, Container } from "react-bootstrap";
import supabase from "../../services/public";
import SignOut from "../../components/SignOut";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

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
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error al obtener el usuario:", error);
        return;
      }

      console.log("Eventos:", data);
      setEvents(data);
    };

    fetchUser();
    fetchEvents();
  }, []);

  return (
    <>
      <Container>
        <p className="h1">Listado de eventos</p>
        {events && events.length > 0 ? (
          events.map((e) => (
            <Card key={e.id}>
              <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Text>
                  {moment(e.date, "YYYY-MM-DD HH:mm:ss").format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </Card.Text>
                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                  <Button className="bg-transparent border-0">
                    <i className="bi bi-eye text-dark"></i>
                  </Button>
                  <Button className="bg-transparent border-0">
                    <i className="bi bi-plus-lg text-dark"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay eventos</p>
        )}
        <Button className="position-fixed bottom-0 end-0 rounded-circle m-3">
          <i className="bi bi-plus-lg"></i>
        </Button>
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
