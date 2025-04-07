import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack
} from '@mui/material';

const TicketsList = ({ empId }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tickets/${empId}`);
        setTickets(res.data.data);
      } catch (error) {
        console.error('Error fetching tickets', error);
      }
    };

    fetchTickets();
  }, [empId]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tickets/${empId}`);
      setTickets(res.data.data);
    } catch (error) {
      console.error('Error fetching tickets', error);
    }
  };
  

  const handleApprove = async (ticketId) => {
    console.log(`Approve ticket ID: ${ticketId}`);
    try{
      const response = await axios.post(`http://localhost:5000/api/tickets/approve`, {
        empId,
        ticketId
      });
      console.log('response', response);
      fetchTickets();

    } catch (error) {
      console.error('Error fetching tickets', error);
    }
  };

  const handleReject = (ticketId) => {
    console.log(`Reject ticket ID: ${ticketId}`);
    // Implement API call here
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Tickets
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="tickets table">
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>{ticket.priority}</TableCell>
                <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleApprove(ticket.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleReject(ticket.id)}
                    >
                      Reject
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TicketsList;
