import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Spinner } from 'react-bootstrap';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NavbarComponent from './components/Navbar';

const HomePage = lazy(() => import('./pages/HomePage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));

const PageLoader = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
    <Spinner animation="border" variant="primary" />
  </Container>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <NavbarComponent />
          
          <main className="flex-grow-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <footer className="bg-dark text-secondary text-center py-3 mt-auto">
            <Container>
              <small>&copy; {new Date().getFullYear()} MediCare Polyclinic.</small>
            </Container>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;