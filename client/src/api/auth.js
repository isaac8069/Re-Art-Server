// src/api/auth.js
import apiUrl from '../apiConfig';
import axios from 'axios';

const client = axios.create({ baseURL: apiUrl });

const authHeader = (user) => ({
  Authorization: `Token token=${user.token}`,
});

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

export const signUp = (credentials) => {
  const email = normalizeEmail(credentials.email);
  return client.post('/api/users/sign-up', {
    credentials: {
      email,
      password: credentials.password,
      // server expects snake_case here
      password_confirmation: credentials.passwordConfirmation,
    },
  });
};

export const signIn = (credentials) => {
  const email = normalizeEmail(credentials.email);
  return client.post('/api/users/sign-in', {
    credentials: {
      email,
      password: credentials.password,
    },
  });
};

export const signOut = (user) => {
  return client.delete('/api/users/sign-out', {
    headers: authHeader(user),
  });
};

export const changePassword = (passwords, user) => {
  return client.patch(
    '/api/users/change-password',
    {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword,
      },
    },
    {
      headers: authHeader(user),
    }
  );
};
