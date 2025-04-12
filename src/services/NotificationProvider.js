// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { Snackbar, Alert } from '@mui/material';

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [open, setOpen] = useState(false);
//   const [notification, setNotification] = useState({
//     message: '',
//     type: 'info',
//   });

//   const notify = useCallback(({ message, type = 'info' }) => {
//     setNotification({ message, type });
//     setOpen(true);
//   }, []);

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setOpen(false);
//   };

//   return (
//     <NotificationContext.Provider value={{ notify }}>
//       {children}
//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert onClose={handleClose} severity={notification.type} variant="filled" sx={{ width: '100%' }}>
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => useContext(NotificationContext);
