import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import TicketsList from '../components/TicketsList';
import TicketBucket from '../components/TicketBucket';
import TicketHistory from '../components/TicketHistory';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  let user = localStorage.getItem('user');
  user = JSON.parse(user)
  console.log('user', user)

  const handleTabChange = (e, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleCreateTicket = () => {
    // Handle ticket creation modal open logic
    console.log("Open create ticket modal");
  };


  return (
    <>
    <Navbar />
    <Box p={4}>
        <TicketsList empId={user.emp_id} />
    </Box>
    {/* <Box sx={{ width: "100%", mt: 4 }}>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Ticket Bucket" />
        <Tab label="Ticket History" />
      </Tabs>

      <Paper sx={{ p: 3, mt: 2 }}>
        {tabIndex === 0 && <TicketBucket onCreate={handleCreateTicket} />}
        {tabIndex === 1 && <TicketHistory />}
      </Paper>
    </Box> */}
    </>
  );
};

export default Home;
