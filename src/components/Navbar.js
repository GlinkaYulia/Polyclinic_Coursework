import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../utils/firebase';

const NavbarComponent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/');
        } catch (error) {
            console.error('Помилка при виході:', error);
        }
    };

    const userName = user?.displayName || user?.email || 'User';
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=C59B27&color=fff&size=30`;

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
                    <span className="text-warning me-2">✚</span>
                    MediCare
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto gap-3 mx-lg-4">
                        <Nav.Link as={NavLink} to="/">Головна</Nav.Link>
                        <Nav.Link as={NavLink} to="/doctors">Лікарі</Nav.Link>
                        <Nav.Link as={NavLink} to="/services">Послуги</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacts">Контакти</Nav.Link>
                    </Nav>

                    <Nav className="align-items-lg-center gap-2 mt-3 mt-lg-0">
                        {user ? (
                            <>
                                <Nav.Link as={NavLink} to="/profile" className="text-light d-flex align-items-center">
                                    <img
                                        src={user?.photoURL || fallbackAvatar}
                                        alt="Аватар"
                                        className="rounded-circle me-2"
                                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = fallbackAvatar; }}
                                    />
                                    {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                                </Nav.Link>
                                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                                    Вийти
                                </Button>
                            </>
                        ) : (
                            <Button as={NavLink} to="/login" variant="warning" size="sm" className="fw-bold px-3">
                                Увійти
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;