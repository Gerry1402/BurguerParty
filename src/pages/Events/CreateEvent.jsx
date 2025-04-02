import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import supabase from '../../services/public';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateEvent() {
  const [evento, setEvento] = useState({ nombre: '', fecha: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMsg('Debes iniciar sesión para crear un evento.');
      return;
    }

    const userId = user.id;

    const { data: newEvent, error: insertEventError } = await supabase
      .from('events')
      .insert([{ name: evento.nombre, date: evento.fecha }])
      .select()
      .single();

    if (insertEventError) {
      setErrorMsg('Error al crear el evento.');
      return;
    }

    const eventId = newEvent.id;

    const { error: insertUserEventError } = await supabase
      .from('user-event')
      .insert([
        {
          user_id: userId,
          event_id: eventId,
          isCreator: true,
          isGuest: true, 
        },
      ]);

    if (insertUserEventError) {
      setErrorMsg('Error al vincular tu cuenta al evento.');
      return;
    }

    alert('Evento creado con éxito');
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="w-75 position-relative mx-auto mt-5">
      <Link to="/" className="btn btn-secondary position-fixed top-0 start-0 m-3">
        ⬅ Volver
      </Link>

      <Container>
        <Card className="p-4 shadow">
          <Card.Body>
            <h2 className="mb-4">Nuevo evento</h2>

            {errorMsg && <p className="text-danger mb-3">{errorMsg}</p>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5"><strong>Nombre del evento</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={evento.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre del evento"
                  className="fs-5"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fs-5"><strong>Fecha del evento</strong></Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={evento.fecha}
                  onChange={handleChange}
                  className="fs-5"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Crear</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CreateEvent;

