import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner, ButtonGroup, Button, Pagination } from 'react-bootstrap';
import useFirestore from '../hooks/useFirestore';
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
    const { data: services, loading, error } = useFirestore('services');

    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return <Container className="py-5"><Alert variant="danger">Помилка: {error}</Alert></Container>;
    }

    const categories = ['All', ...new Set(services.map(s => s.category))].sort();

    const filteredServices = services.filter((service) => {
        const matchCategory = activeCategory === 'All' || service.category === activeCategory;
        const matchSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService); // Вирізаємо потрібний шматок

    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryFilter = (cat) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-primary">Наші послуги</h2>

            <div className="bg-white p-3 rounded shadow-sm border mb-4 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                <ButtonGroup className="flex-wrap">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? 'primary' : 'outline-primary'}
                            size="sm"
                            onClick={() => handleCategoryFilter(cat)}
                        >
                            {cat === 'All' ? 'Усі напрямки' : cat}
                        </Button>
                    ))}
                </ButtonGroup>

                <Form.Control
                    type="text"
                    placeholder="Пошук послуги..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ maxWidth: '250px' }}
                />
            </div>

            <div className="mb-3 text-muted">
                Знайдено послуг: {filteredServices.length}
            </div>

            {filteredServices.length === 0 ? (
                <Alert variant="info" className="text-center">
                    Послуг не знайдено.
                </Alert>
            ) : (
                <>
                    <Row className="gy-4">
                        {currentServices.map(service => (
                            <Col key={service.id} md={6} lg={4}>
                                <ServiceCard service={service} />
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <Pagination className="justify-content-center mt-5">
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => paginate(currentPage - 1)}
                            />

                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={() => paginate(currentPage + 1)}
                            />
                        </Pagination>
                    )}
                </>
            )}
        </Container>
    );
};

export default ServicesPage;