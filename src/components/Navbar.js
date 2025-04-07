import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  console.log('user', user)

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tickets Dashboard
        </Typography>
        <Box>
          <Typography variant="subtitle1">
            Welcome, {user.name || 'User'} ({user.role})
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
