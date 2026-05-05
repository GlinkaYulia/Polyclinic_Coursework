import React, { useState } from 'react';
import { Container, Row, Col, Form, Spinner, Alert, Pagination } from 'react-bootstrap';
import useFirestore from '../hooks/useFirestore';
import DoctorCard from '../components/DoctorCard';

const DoctorsPage = () => {
    const { data: doctors, loading, error } = useFirestore('doctors');

    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('All');

    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 6;

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
    }

    const specialties = ['All', ...new Set(doctors.map(d => d.specialty))].sort();

    const filteredDoctors = doctors.filter(doctor => {
        const matchSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchSpecialty = specialtyFilter === 'All' || doctor.specialty === specialtyFilter;
        return matchSearch && matchSpecialty;
    });

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFilter = (e) => {
        setSpecialtyFilter(e.target.value);
        setCurrentPage(1);
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-primary fw-bold">Наші спеціалісти</h2>

            <div className="bg-white p-3 rounded shadow-sm border mb-4 d-flex flex-column flex-md-row gap-3">
                <Form.Control
                    type="text"
                    placeholder="Пошук за ім'ям..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ maxWidth: '300px' }}
                />
                <Form.Select
                    value={specialtyFilter}
                    onChange={handleFilter}
                    style={{ maxWidth: '300px' }}
                >
                    {specialties.map(spec => (
                        <option key={spec} value={spec}>
                            {spec === 'All' ? 'Всі спеціальності' : spec}
                        </option>
                    ))}
                </Form.Select>
            </div>

            {filteredDoctors.length === 0 ? (
                <Alert variant="info">За вашим запитом лікарів не знайдено.</Alert>
            ) : (
                <>
                    <Row className="gy-4 mb-4">
                        {currentDoctors.map(doctor => (
                            <Col key={doctor.id} md={6} lg={4}>
                                <DoctorCard doctor={doctor} />
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <Pagination className="justify-content-center mt-4">
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

export default DoctorsPage;