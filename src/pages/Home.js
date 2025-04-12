import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import {
  Box,
} from '@mui/material';
import TicketsList from '../components/TicketsList';

const Home = () => {
  let user = localStorage.getItem('user');
  user = JSON.parse(user)
  console.log('user', user)


  return (
    <>
    <Navbar />
    <Box p={4}>
        <TicketsList empId={user.emp_id} />
    </Box>
    </>
  );
};

export default Home;
