import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

const supabase = createClient(
  'https://apwvdicuxcbvlhqcjpld.supabase.co',
  import.meta.env.VITE_ROLE_KEY
);

function DetailsEvent() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const [creador, setCreador] = useState(null);
  const [joined, setJoined] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvento = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) console.error(' Error cargando evento:', error.message);
    else setEvento(data);
  };

  const fetchParticipantsAndCreator = async () => {
    const { data: authUser } = await supabase.auth.getUser();
    const currentUserId = authUser?.user?.id;
    setUserId(currentUserId);

    try {
      const { data: guests, error: guestsError } = await supabase
        .from('user-event')
        .select('user_id, isGuest, isCreator')
        .eq('event_id', id)
        .eq('isGuest', true);

      const { data: creatorRow, error: creatorError } = await supabase
        .from('user-event')
        .select('user_id')
        .eq('event_id', id)
        .eq('isCreator', true)
        .limit(1)
        .maybeSingle();

      const { data: allUsersData } = await supabase.auth.admin.listUsers();
      const allUsers = allUsersData?.users ?? [];

      if (guestsError || creatorError) {
        console.error(' Error cargando participantes o creador');
        return;
      }

      console.log('Todos los usuarios:', allUsers);

      const usersMap = {};
      allUsers.forEach((u) => {
        usersMap[u.id] = {
          name: u.user_metadata?.name || '',
          surname: u.user_metadata?.surname || '',
        };
      });

      console.log('🗺️ Mapa de usuarios:', usersMap);
      console.log('👤 Creador del evento:', creatorRow);
      console.log('👥 Participantes encontrados:', guests);

      const enrichedGuests = guests.map((g) => ({
        user_id: g.user_id,
        ...usersMap[g.user_id],
      }));

      const enrichedCreator = usersMap[creatorRow?.user_id] || null;

      console.log('👥 Participantes enriquecidos:', enrichedGuests);
      console.log('👤 Creador enriquecido:', enrichedCreator);

      setParticipantes(enrichedGuests);
      setCreador(enrichedCreator);
      setJoined(guests.some((g) => g.user_id === currentUserId));
    } catch (error) {
      console.error('Error obteniendo usuarios:', error.message);
    }
  };

  const handleUnirse = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Debes iniciar sesión');

    const { error } = await supabase.from('user-event').insert([
      {
        user_id: user.id,
        event_id: parseInt(id),
        isGuest: true,
        isCreator: false,
      },
    ]);

    if (error) {
      alert('Error al unirse');
    } else {
      alert('¡Unido al evento!');
      fetchParticipantsAndCreator();
    }
  };

  const handleDesunirse = async () => {
    const { error } = await supabase
      .from('user-event')
      .delete()
      .eq('event_id', id)
      .eq('user_id', userId)
      .eq('isGuest', true);

    if (error) {
      alert('Error al desunirse');
    } else {
      alert('Te has desunido del evento');
      fetchParticipantsAndCreator();
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchEvento();
      await fetchParticipantsAndCreator();
      setLoading(false);
    };

    load();
  }, [id]);

  return (
    <div className="w-100 position-relative mx-auto mt-5">
      <Link to="/" className="btn btn-secondary position-fixed top-0 start-0 m-3">
        ⬅ Volver
      </Link>

      <Container>
        <Card className="p-4 shadow">
          <Card.Body>
            <h2 className="mb-4">Detalles del evento</h2>

            {loading ? (
              <p className="text-center fs-4 text-muted">⏳ Cargando...</p>
            ) : evento ? (
              <>
                <p className="fs-5"><strong>Nombre del evento:</strong> {evento.name}</p>
                <p className="fs-5"><strong>Fecha de creación:</strong> {evento.date}</p>
                <p className="fs-5">
                  <strong>Creador:</strong>{' '}
                  {creador && (creador.name || creador.surname)
                    ? `${creador.name ?? 'Nombre'} ${creador.surname ?? 'Apellido'}`
                    : 'No especificado'}
                </p>

                <Accordion className="mt-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="fs-5">Participantes</Accordion.Header>
                    <Accordion.Body>
                      {participantes.length > 0 ? (
                        <ul className="fs-5">
                          {participantes.map((p, i) => (
                            <li key={i}>
                              {(p.name || p.surname) ? `${p.name ?? 'Nombre'} ${p.surname ?? 'Apellido'}` : 'Sin nombre'}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">Aún no hay participantes.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <div className="d-flex justify-content-end mt-4">
                  {joined ? (
                    <Button variant="danger" onClick={handleDesunirse}>Desunirse</Button>
                  ) : (
                    <Button variant="primary" onClick={handleUnirse}>Unirme</Button>
                  )}
                </div>
              </>
            ) : (
              <p className="text-danger">No se encontró el evento.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DetailsEvent;