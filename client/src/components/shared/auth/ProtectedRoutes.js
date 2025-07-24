import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';

// Protected Components
import Profile from '../../pages/Profile_Folder/Profile';
import ChangePassword from '../../auth/ChangePassword';

const ProtectedRoutes = () => {
  return (
    <RequireAuth>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </RequireAuth>
  );
};

export default ProtectedRoutes;
