import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!isValidEmail(formData.email))
      newErrors.email = 'Please enter a valid email.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSubmitted(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        },
        (err) => {
          console.error('FAILED...', err);
          setError('Failed to send message. Please try again later.');
        }
      )
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="page-container contact-page">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Please fill out the form below:</p>

      {/* Toast Notification */}
      {showToast && <div className="toast-success">Message sent successfully!</div>}

      {submitted ? (
        <div className="success-container">
          <div className="checkmark-animation">
            <div className="checkmark"></div>
          </div>
          <p className="thank-you-message">
            Thank you for your message! We'll be in touch soon.
          </p>
          <button className="send-another-btn" onClick={resetForm}>
            Send Another Message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
