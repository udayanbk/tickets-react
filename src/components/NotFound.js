// src/pages/NotFound.jsx
import React from "react";
import { Typography, Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        The page you're looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
