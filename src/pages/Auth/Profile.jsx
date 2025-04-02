import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import supabase from "../../services/supabase";

const Profile = () => {
  const [user, setUsers] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.getUserById(uuid);

      if (error) {
        console.error("Error al obtener usuarios:", error);
        return;
      }

      setUsers(data.user);
    };

    fetchUsers();
  }, [uuid]);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-90">
        {user ? (
          <Card
            key={user.id}
            className="p-2 rounded"
            style={{ width: "30rem" }}
          >
            <Card.Body>
              <Card.Title className="mb-3">
                <p className="h1">Perfil</p>
              </Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>UID:</strong> {user.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Nombre:</strong>{" "}
                  {user.user_metadata?.name || "No disponible"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Apellido:</strong>{" "}
                  {user.user_metadata?.surname || "No disponible"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Fecha Nacimiento:</strong>{" "}
                  {user.user_metadata?.birthdate || "No disponible"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ) : (
          <p>Cargando usuarios...</p>
        )}
      </Container>
    </>
  );
};

export default Profile;
