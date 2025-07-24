import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      
      <div className="not-found-actions">
        <button
          onClick={() => navigate(-1)}
          className="go-back-button"
        >
          Go Back
        </button>

        <Link to="/" className="home-link">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
