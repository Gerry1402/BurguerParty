import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetailsEvent() {
  const evento = {
    nombre: 'Conferencia Tech 2025',
    creador: 'María González',
    fechaCreacion: '2025-03-28',
    participantes: ['Juan', 'Paco', 'Laura', 'Ana'],
  };

  return (
    <div className="w-75 position-relative mx-auto mt-5">
      <Link to="/" className="btn btn-secondary position-fixed top-0 start-0 m-3">
        ⬅ Volver
      </Link>

      <Container>
        <Card className="p-4 shadow">
          <Card.Body>
            <h2 className="mb-4">Detalles del evento</h2>

            <p className="fs-5"><strong>Nombre del evento:</strong> {evento.nombre}</p>
            <p className="fs-5"><strong>Creador:</strong> {evento.creador}</p>
            <p className="fs-5"><strong>Fecha de creación:</strong> {evento.fechaCreacion}</p>

            <div className="mt-4">
              <strong className="fs-5">Participantes:</strong>
              <ul className="fs-5 mt-2">
                {evento.participantes.map((nombre, index) => (
                  <li key={index}>{nombre}</li>
                ))}
              </ul>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary">Unirme</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DetailsEvent;
