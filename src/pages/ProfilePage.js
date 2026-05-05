import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { logoutUser, db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const userAppointments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAppointments(userAppointments);
      } catch (err) {
        console.error("Помилка завантаження візитів:", err);
        setError("Не вдалося завантажити історію візитів.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  if (!user) return null;

  const today = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter(a => a.date >= today && a.status !== 'completed');
  const past = appointments.filter(a => a.date < today || a.status === 'completed');

    const userName = user?.displayName || user?.email || 'User';
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=C59B27&color=fff&size=120`;

  return (
    <Container className="py-5">
      <Row className="gy-4">

        <Col lg={4}>
          <Card className="shadow-sm border-0 text-center p-3 position-sticky" style={{ top: '80px', borderRadius: '15px' }}>
            <Card.Body>
                <img
                    src={user?.photoURL || fallbackAvatar}
                    alt="Аватар"
                    className="rounded-circle me-2"
                    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackAvatar; }}
                />
              <Card.Title className="text-primary fw-bold fs-4">
                {user?.displayName || 'Пацієнт'}
              </Card.Title>
              <Card.Text className="text-muted mb-4 pb-2 border-bottom">
                <i className="bi bi-envelope me-2"></i>{user?.email}
              </Card.Text>

              <div className="d-flex justify-content-between text-muted small mb-4 px-2">
                <span>Всього візитів: <strong>{appointments.length}</strong></span>
                <span>Заплановано: <strong>{upcoming.length}</strong></span>
              </div>

              <Button variant="outline-danger" onClick={handleLogout} className="w-100 fw-bold">
                <i className="bi bi-box-arrow-right me-2"></i>Вийти з акаунта
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <h3 className="mb-4 text-primary fw-bold">
            <i className="bi bi-calendar2-check me-2"></i>Мої візити
          </h3>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger"><i className="bi bi-exclamation-triangle me-2"></i>{error}</Alert>
          ) : (
            <>
              <h5 className="mb-3 text-dark fw-bold">
                <i className="bi bi-hourglass-split text-primary me-2"></i>Майбутні ({upcoming.length})
              </h5>
              {upcoming.length === 0 ? (
                <Alert variant="light" className="border text-center py-5 shadow-sm" style={{ borderRadius: '10px' }}>
                  <i className="bi bi-calendar-x fs-1 text-muted d-block mb-3"></i>
                  <span className="text-muted">У вас немає запланованих візитів.</span>
                </Alert>
              ) : (
                upcoming.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)
              )}

              <h5 className="mt-5 mb-3 text-muted fw-bold">
                <i className="bi bi-clock-history me-2"></i>Історія візитів ({past.length})
              </h5>
              {past.length === 0 ? (
                <p className="text-muted text-center py-4 bg-white rounded border shadow-sm">Історія порожня.</p>
              ) : (
                past.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)
              )}
            </>
          )}
        </Col>

      </Row>
    </Container>
  );
};

export default ProfilePage;