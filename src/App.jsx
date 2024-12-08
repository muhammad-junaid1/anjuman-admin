import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "react-toastify/ReactToastify.min.css";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("admin_anjuman_token"));

  return !user ? (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/" replace element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" replace element={<Navigate to="/admin/default" />} />
    </Routes>
  );
};

export default App;
