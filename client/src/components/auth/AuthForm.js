// src/components/auth/AuthForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ need Link for the forgot-password anchor
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
    if (loading) return;

    const normalizedEmail = String(email).trim().toLowerCase();

    if (isSignUp && password !== passwordConfirmation) {
      showToast(`${messages.signUpFailure} Passwords do not match.`, 'error');
      return;
    }

    setLoading(true);
    try {
      let userData;

      if (isSignUp) {
        // Send both the GA-style {credentials:{...}} and flat fields for compatibility
        const signUpResult = await signUp({
          email: normalizedEmail,
          password,
          passwordConfirmation,
          password_confirmation: passwordConfirmation,
          credentials: { email: normalizedEmail, password, password_confirmation: passwordConfirmation },
        });
        if (signUpResult?.error) throw new Error(signUpResult.message || 'Sign up failed');

        const signInResult = await signIn({
          email: normalizedEmail,
          password,
          credentials: { email: normalizedEmail, password },
        });
        if (signInResult?.error) throw new Error(signInResult.message || 'Sign in failed');

        userData = signInResult.data?.user || signInResult.user;
        showToast(messages.signUpSuccess, 'success');
      } else {
        const signInResult = await signIn({
          email: normalizedEmail,
          password,
          credentials: { email: normalizedEmail, password },
        });
        if (signInResult?.error) throw new Error(signInResult.message || 'Sign in failed');

        userData = signInResult.data?.user || signInResult.user;
        showToast(messages.signInSuccess, 'success');
      }

      // Ensure we have token + email; your API returns { user: { id, email, token } }
      if (!userData?.token || !userData?.email) {
        throw new Error('Missing token or user data from server');
      }

      // Persist to auth context (downstream fetches should use `Authorization: "Token token=<user.token>"`)
      login(userData);
      navigate('/');
    } catch (error) {
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      showToast(
        (isSignUp ? messages.signUpFailure : messages.signInFailure) +
          (error?.message ? ` ${error.message}` : ''),
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
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              value={email}
              type="email"
              placeholder="Enter email"
              autoComplete="email"
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
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

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
                autoComplete="new-password"
                minLength={6}
                isInvalid={!!passwordConfirmation && passwordConfirmation !== password}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Passwords must match.
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
            {loading ? (isSignUp ? 'Signing Up...' : 'Signing In...') : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
