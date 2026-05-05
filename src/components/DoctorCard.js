import React from 'react';
import { Badge, Card, Button } from 'react-bootstrap';

const DoctorCard = ({ doctor, onBookClick }) => {
  return (
    <Card className="h-100 shadow-sm border-0 d-flex flex-column" style={{ transition: 'transform 0.2s' }}>
      <div style={{ position: 'relative' }}>
        <Card.Img
          variant="top"
          src={doctor.photo}
          alt={doctor.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Badge
          bg={doctor.available ? 'success' : 'secondary'}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          {doctor.available ? 'Приймає пацієнтів' : 'Недоступний'}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-warning fw-bold">
            <i className="bi bi-star-fill me-1"></i> {doctor.rating}
          </span>
          <small className="text-muted">Досвід: {doctor.experience} р.</small>
        </div>

        <Card.Title className="mb-1 text-primary">{doctor.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{doctor.specialty}</Card.Subtitle>

        <Card.Text className="flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {doctor.bio}
        </Card.Text>

        <hr className="my-2" />

        <div className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
          <div><i className="bi bi-calendar3 me-2"></i><strong>Графік:</strong> {doctor.schedule}</div>
          <div><i className="bi bi-translate me-2"></i><strong>Мови:</strong> {doctor.languages.join(', ')}</div>
        </div>

        <Button
          variant={doctor.available ? "primary" : "secondary"}
          className="w-100 fw-bold mt-auto"
          disabled={!doctor.available}
          onClick={() => onBookClick(doctor)}
        >
          {doctor.available ? 'Записатися на прийом' : 'Запис закрито'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;