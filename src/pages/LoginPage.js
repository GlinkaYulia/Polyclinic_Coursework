import React, { useState } from 'react';
import { Container, Card, Button, Form, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/profile';

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Не вдалося увійти через Google.');
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError('Неправильний email або пароль.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Цей email вже зареєстрований.');
      } else if (err.code === 'auth/weak-password') {
        setError('Пароль має містити щонайменше 6 символів.');
      } else {
        setError('Сталася помилка. Перевірте дані та спробуйте ще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '420px', padding: '1.5rem', borderRadius: '15px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <i className="bi bi-shield-lock text-primary" style={{ fontSize: '3rem' }}></i>
            <h3 className="mt-2 fw-bold text-dark">{isRegistering ? 'Створити акаунт' : 'Вхід у кабінет'}</h3>
            <p className="text-muted small">Отримайте доступ до своїх медичних записів</p>
          </div>

          {error && (
            <Alert variant="danger" className="small d-flex align-items-center">
              <i className="bi bi-exclamation-circle-fill me-2"></i> {error}
            </Alert>
          )}

          <Button 
            variant="outline-dark"
            className="w-100 mb-4 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <i className="bi bi-google text-danger"></i> Увійти через Google
          </Button>

          <div className="d-flex align-items-center mb-4">
            <hr className="flex-grow-1" />
            <span className="mx-3 text-muted small">АБО EMAIL</span>
            <hr className="flex-grow-1" />
          </div>

          <Form onSubmit={handleEmailAuth}>
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted mb-1 fw-bold">Електронна пошта</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <i className="bi bi-envelope text-muted"></i>
                </InputGroup.Text>
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com"
                  className="border-start-0 ps-0 bg-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small text-muted mb-1 fw-bold">Пароль</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <i className="bi bi-lock text-muted"></i>
                </InputGroup.Text>
                <Form.Control 
                  type="password" 
                  placeholder="Мінімум 6 символів"
                  className="border-start-0 ps-0 bg-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </InputGroup>
            </Form.Group>

            <Button 
              type="submit" 
              variant="primary"
              className="w-100 py-2 fw-bold" 
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" animation="border" /> : (isRegistering ? 'Зареєструватися' : 'Увійти')}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <Button 
              variant="link" 
              className="text-muted p-0 text-decoration-none fw-bold" 
              style={{ fontSize: '0.9rem' }}
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
            >
              {isRegistering ? 'Вже маєте акаунт? Увійдіть' : 'Немає акаунта? Зареєструйтесь'}
            </Button>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;