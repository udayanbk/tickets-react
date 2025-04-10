// // components/TicketHistory.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// export default function TicketHistory() {
//   const [tickets, setTickets] = useState([]);

//   const fetchApprovedTickets = async () => {
//     try {
//       const res = await axios.get("/api/tickets?status=approved");
//       setTickets(res.data);
//     } catch (err) {
//       console.error("Error fetching approved tickets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchApprovedTickets();
//   }, []);

//   return (
//     <>
//       <Typography variant="h5" gutterBottom>
//         Ticket History (Approved Only)
//       </Typography>

//       {tickets.length === 0 ? (
//         <Box textAlign="center" sx={{ mt: 5 }}>
//           <Typography variant="h6" color="text.secondary">
//             No approved tickets found.
//           </Typography>
//         </Box>
//       ) : (
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sr. No</TableCell>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Created At</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tickets.map((ticket, index) => (
//                 <TableRow key={ticket.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{ticket.title}</TableCell>
//                   <TableCell>{ticket.description}</TableCell>
//                   <TableCell>{ticket.status}</TableCell>
//                   <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </>
//   );
// }
