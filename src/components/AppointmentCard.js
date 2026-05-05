import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const AppointmentCard = ({ appointment }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed': 
        return <Badge bg="success"><i className="bi bi-check-circle me-1"></i>Підтверджено</Badge>;
      case 'pending': 
        return <Badge bg="warning" text="dark"><i className="bi bi-hourglass me-1"></i>Очікується</Badge>;
      case 'completed': 
        return <Badge bg="secondary"><i className="bi bi-check2-all me-1"></i>Завершено</Badge>;
      default: 
        return <Badge bg="primary">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm border-0 mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h5 className="text-primary mb-0 fw-bold">{appointment.doctorName}</h5>
          {getStatusBadge(appointment.status)}
        </div>
        <div className="text-muted small mb-3">{appointment.specialty}</div>

        <div className="d-flex justify-content-between align-items-center mb-3 text-muted" style={{ fontSize: '0.95rem' }}>
          <div>
            <i className="bi bi-calendar3 text-primary me-2"></i>{appointment.date}
          </div>
          <div>
            <i className="bi bi-clock text-primary me-2"></i>{appointment.time}
          </div>
        </div>

        {appointment.notes && (
          <div className="bg-light p-2 rounded small text-secondary border">
            <strong>Примітка:</strong> {appointment.notes}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;