import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateEvent() {
  const [evento, setEvento] = useState({
    nombre: '',
    fecha: '',
    lugar: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-50 position-relative mx-auto mt-5">
      <Button variant="secondary" className="position-fixed top-0 start-0 m-3">
        ⬅ Volver
      </Button>

      <Container>
        <Card className="p-4 shadow">
          <Card.Body>
            <h2 className="mb-4">Nuevo evento</h2>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">
                  <strong>Nombre del evento</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={evento.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre del evento"
                  className="fs-5"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fs-5">
                  <strong>Fecha del evento</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={evento.fecha}
                  onChange={handleChange}
                  className="fs-5"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fs-5">
                  <strong>Lugar del evento</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lugar"
                  value={evento.lugar}
                  onChange={handleChange}
                  placeholder="Ingresa el lugar"
                  className="fs-5"
                />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary">Crear</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CreateEvent;
