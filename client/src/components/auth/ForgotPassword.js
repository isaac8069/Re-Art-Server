import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import messages from '../shared/AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Example API call (adjust endpoint to match your backend)
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      const response = await axios.post(`${API_URL}/forgot-password`, { email });

      if (response.status === 200) {
        showToast(messages.forgotPasswordSuccess || 'Password reset email sent!', 'success');
        navigate('/sign-in');
      } else {
        showToast('Failed to send password reset email.', 'error');
      }
    } catch (error) {
      showToast(error.response?.data?.error || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h5>Forgot Password</h5>
        <Form onSubmit={handleForgotPassword}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
