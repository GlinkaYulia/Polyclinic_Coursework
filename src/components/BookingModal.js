import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const BookingModal = ({ show, handleClose, doctor }) => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const closeAndReset = () => {
    setTimeout(() => {
      setIsSuccess(false);
      setDate('');
      setTime('');
      setNotes('');
    }, 300);
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newAppointment = {
        userId: user ? user.uid : 'guest',
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: date,
        time: time,
        status: 'confirmed',
        notes: notes,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'appointments'), newAppointment);

      setIsSuccess(true);
    } catch (error) {
      console.error("Помилка при записі: ", error);
      alert("Не вдалося записатися. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!doctor) return null;

  return (
    <Modal show={show} onHide={closeAndReset} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Запис на прийом</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSuccess ? (
          <Alert variant="success" className="text-center">
            <h4 className="alert-heading">Успішно!</h4>
            <p>Ви записані до лікаря {doctor.name}.</p>
            <hr />
            <p className="mb-0">Чекаємо на вас {date} о {time}.</p>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <strong>Лікар:</strong> {doctor.name} <br />
              <span className="text-muted">{doctor.specialty}</span>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Дата візиту</Form.Label>
              <Form.Control
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Час візиту</Form.Label>
              <Form.Select required value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="">Оберіть час...</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:30">11:30</option>
                <option value="14:00">14:00</option>
                <option value="15:30">15:30</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Коментар (необов'язково)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Скарги або побажання..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Підтвердити запис'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;