import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Menu,
  MenuItem,
  ClickAwayListener,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logout } from '../api/user_api';

const Navbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    const resp = await logout();
    console.log("resp-----out--", resp)
    localStorage.removeItem('user');
    setLogoutDialogOpen(false);
    enqueueSnackbar('Logout Successfully!', { variant: 'success' });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <ClickAwayListener onClickAway={handleClose}>
          <Box onMouseEnter={handleMouseEnter}>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: "pointer", display: "inline-block" }}
            >
              Tickets Dashboard
            </Typography>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleNavigate("/settings")}>Settings</MenuItem>
              <MenuItem onClick={() => handleNavigate("/assign-roles")}>Assign User Roles</MenuItem>
            </Menu>
          </Box>
        </ClickAwayListener>

        <Box display="flex" alignItems="center" gap={2} ml="auto">
          <Typography variant="subtitle1">
            Welcome, {user.name || 'User'} ({user.role})
          </Typography>
          <Button color="inherit" onClick={() => setLogoutDialogOpen(true)}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Snackbar */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default Navbar;
