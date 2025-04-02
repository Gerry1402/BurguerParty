import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import supabase from "../../services/public";
import SignOut from "../../components/SignOut";

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
        console.error("Error al obtener los eventos:", error);
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
            <Card key={e.id} className="mb-3 position-relative">
              <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Text>
                  {moment(e.date, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm")}
                </Card.Text>

                <div className="position-absolute top-50 end-0 translate-middle-y me-3 d-flex gap-2">
                  <Link to={`/events/${e.id}`}>
                    <Button className="bg-transparent border-0">
                      <i className="bi bi-plus-lg text-dark fs-4"></i>
                    </Button>
                  </Link>
                  <Button className="bg-transparent border-0" disabled>
                    <i className="bi bi-eye text-muted fs-4"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay eventos</p>
        )}

        <Link to="/create-event">
          <Button className="position-fixed bottom-0 end-0 rounded-circle m-3" style={{ width: "60px", height: "60px" }}>
            <i className="bi bi-plus-lg fs-4"></i>
          </Button>
        </Link>
      </Container>
      {user ? (
        <Link to={`/profile/${user.id}`}>
          <Button className="mt-4">Ver perfil</Button>
        </Link>
      ) : (
        <p>Cargando usuario...</p>
      )}

      <SignOut />
    </>
  );
};

export default Events;
