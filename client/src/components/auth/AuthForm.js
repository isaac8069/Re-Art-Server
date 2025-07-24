import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../api/auth';
import { useAuth } from '../../context/auth/AuthContext';
import { useToast } from '../../context/ToastContext';
import messages from '../shared/AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AuthForm = ({ mode = 'signin' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === 'signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let userData;

      if (isSignUp) {
        const signUpResult = await signUp({ email, password, passwordConfirmation });
        if (signUpResult.error) throw new Error(signUpResult.message);

        const signInResult = await signIn({ email, password });
        if (signInResult.error) throw new Error(signInResult.message);

        userData = signInResult.data.user;
        showToast(messages.signUpSuccess, 'success');
      } else {
        const signInResult = await signIn({ email, password });
        if (signInResult.error) throw new Error(signInResult.message);

        userData = signInResult.data.user;
        showToast(messages.signInSuccess, 'success');
      }

      login(userData);
      navigate('/');
    } catch (error) {
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      showToast(
        (isSignUp ? messages.signUpFailure : messages.signInFailure) + ' ' + (error.message || ''),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h5>{isSignUp ? 'Sign Up' : 'Sign In'}</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              value={email}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Forgot Password Link (only for Sign In) */}
          {!isSignUp && (
            <div className="mt-2">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
          )}

          {isSignUp && (
            <Form.Group controlId="passwordConfirmation" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
            {loading
              ? (isSignUp ? 'Signing Up...' : 'Signing In...')
              : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
