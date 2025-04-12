import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import constants from "../config/constants";

const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${constants.APP_URL}/auth/check-token`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          navigate("/home");
        } else {
          setLoading(false);
        }
      } catch {
        // Not logged in
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return null;
  return children;
};

export default PublicRoute;
