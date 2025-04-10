// // components/TicketBucket.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import axios from "axios";

// export default function TicketBucket({ onCreate }) {
//   const [tickets, setTickets] = useState([]);

//   const fetchBucketTickets = async () => {
//     try {
//       const res = await axios.get("/api/tickets");
//       setTickets(res.data);
//     } catch (err) {
//       console.error("Error fetching tickets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBucketTickets();
//   }, []);
  

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={onCreate}>
//         Create Ticket
//       </Button>

//       <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
//         My Tickets
//       </Typography>

//       {tickets.length === 0 ? (
//         <Box textAlign="center" sx={{ mt: 5 }}>
//           <Typography variant="h6" color="text.secondary">
//             No tickets available in your bucket.
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
