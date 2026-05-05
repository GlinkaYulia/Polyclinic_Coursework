import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className="bg-dark text-light py-5" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <Container>
                    <Row className="align-items-center gy-4">
                        <Col lg={6}>
                            <h6 className="text-warning text-uppercase fw-bold tracking-wider mb-3">
                                <i className="bi bi-shield-check me-2"></i>Сучасна медицина
                            </h6>
                            <h1 className="display-4 fw-bold mb-4">
                                Ваше здоров'я — <br />наш головний пріоритет
                            </h1>
                            <p className="lead text-secondary mb-4">
                                Команда досвідчених спеціалістів, сучасне обладнання та індивідуальний підхід до кожного пацієнта.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Button as={Link} to="/services" variant="warning" size="lg" className="fw-bold">
                                    <i className="bi bi-card-list me-2"></i>Наші послуги
                                </Button>
                                <Button as={Link} to="/doctors" variant="outline-light" size="lg">
                                    <i className="bi bi-people me-2"></i>Обрати лікаря
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} className="d-none d-lg-block">
                            <img
                                src="/images/image.png"
                                alt="Головна будівля"
                                className="img-fluid rounded shadow-lg"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5 my-5">
                <Row className="align-items-center gy-5">

                    <Col lg={6} className="pe-lg-5">
                        <h6 className="text-primary text-uppercase fw-bold mb-2">Про клініку</h6>
                        <h2 className="fw-bold mb-4">Надійний медичний партнер для всієї родини</h2>
                        <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                            Поліклініка MediCare — це багатопрофільний медичний центр, який об'єднує передові технології та багаторічний досвід лікарів. Ми прагнемо зробити якісну медицину доступною та комфортною для кожного.
                        </p>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-3 d-flex align-items-center">
                                <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                                <span>Використовуємо лише сертифіковані апарати для точної діагностики.</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                                <span>Інноваційна система онлайн-запису економить ваш час.</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                                <span>Уся історія візитів завжди під рукою у вашому смартфоні.</span>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={6}>
                        <Row className="g-4 text-center">
                            <Col xs={6}>
                                <Card className="h-100 border-0 bg-light shadow-sm border-top border-4 border-warning">
                                    <Card.Body className="py-4">
                                        <h2 className="text-primary fw-bold display-5 mb-1">15+</h2>
                                        <span className="text-muted fw-bold">Років досвіду</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card className="h-100 border-0 bg-light shadow-sm border-top border-4 border-warning">
                                    <Card.Body className="py-4">
                                        <h2 className="text-primary fw-bold display-5 mb-1">60+</h2>
                                        <span className="text-muted fw-bold">Спеціалістів</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card className="h-100 border-0 bg-light shadow-sm border-top border-4 border-warning">
                                    <Card.Body className="py-4">
                                        <h2 className="text-primary fw-bold display-5 mb-1">10k+</h2>
                                        <span className="text-muted fw-bold">Пацієнтів щороку</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6}>
                                <Card className="h-100 border-0 bg-light shadow-sm border-top border-4 border-warning">
                                    <Card.Body className="py-4">
                                        <h2 className="text-primary fw-bold display-5 mb-1">24/7</h2>
                                        <span className="text-muted fw-bold">Підтримка</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default HomePage;