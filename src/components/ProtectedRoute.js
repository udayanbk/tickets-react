// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import constants from "../config/constants";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${constants.APP_URL}/auth/check-token`, {
          withCredentials: true,
        });
        console.log("res", res)
        if (res.status === 200) setValid(true);
      } catch (err) {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null; // or a loader

  return valid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
