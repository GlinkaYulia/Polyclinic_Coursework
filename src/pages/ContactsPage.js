import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const ContactsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <Container className="py-5">
      <Row className="gy-5">

        <Col lg={5}>
          <h2 className="text-primary fw-bold mb-4">
            <i className="bi bi-telephone-outbound me-3"></i>Наші контакти
          </h2>
          <p className="text-muted mb-4">
            Залишилися питання? Напишіть нам, і адміністратор зв'яжеться з вами найближчим часом.
          </p>
          
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex mb-3">
                <i className="bi bi-geo-alt text-primary fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Адреса</h6>
                  <p className="text-muted mb-0">вул. Довга, 14, м. Івано-Франківськ</p>
                </div>
              </div>
              
              <div className="d-flex mb-3">
                <i className="bi bi-telephone text-primary fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Телефон</h6>
                  <p className="text-muted mb-0">+380 978 747 852</p>
                </div>
              </div>

              <div className="d-flex">
                <i className="bi bi-clock text-primary fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Години роботи</h6>
                  <p className="text-muted mb-0">Пн-Пт: 08:00 – 20:00<br/>Сб: 09:00 – 15:00</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="border-0 shadow-sm p-3 p-md-4">
            <Card.Body>
              <h4 className="mb-4">
                <i className="bi bi-envelope-paper me-2"></i>Надіслати повідомлення
              </h4>
              
              {submitted ? (
                <Alert variant="success" className="text-center py-4">
                  <i className="bi bi-check-circle-fill fs-1 d-block mb-3"></i>
                  <h5>Дякуємо за звернення!</h5>
                  <p className="mb-0">Ми отримали вашого листа і відповімо найближчим часом.</p>
                  <Button variant="outline-success" className="mt-3" onClick={() => setSubmitted(false)}>
                    Написати ще
                  </Button>
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ваше ім'я</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      placeholder="Олександр"
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Електронна пошта</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      placeholder="example@mail.com"
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Повідомлення</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      name="message" 
                      placeholder="Опишіть ваше запитання..."
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" size="lg" className="w-100">
                    <i className="bi bi-send me-2"></i>Надіслати
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactsPage;