import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="service-icon">
            <i className={`bi bi-${service.icon}`} style={{ fontSize: '2rem', color: '#0d6efd' }}></i>
          </div>
          <Badge bg="warning" text="dark" className="text-uppercase">
            {service.category}
          </Badge>
        </div>

        <Card.Title className="text-primary">{service.name}</Card.Title>
        <Card.Text className="text-muted mb-2">
          {service.shortDescription}
        </Card.Text>

        <Collapse in={expanded}>
          <div className="text-secondary small mb-3">
            <hr />
            {service.fullDescription}
          </div>
        </Collapse>

        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold text-dark d-block">{service.price}</span>
            <small className="text-muted">
              <i className="bi bi-clock me-1"></i>
              {service.duration}
            </small>
          </div>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Сховати' : 'Детальніше'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;