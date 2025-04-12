// components/TicketHistory.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TableContainer,
  Paper,
  Pagination,
} from "@mui/material";
import { ticketHistory } from "../api/ticket_api";

export default function TicketHistory() {
  const [historyTickets, setHistoryTickets] = useState([]);
  const [pagination, setPagination] = useState();
  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async (pageNo) => {
    console.log('fetchData---starts----', pageNo)
    let response = await ticketHistory({ pageNo });
      console.log("handleTabChange", response);
      if (response?.data?.data) {
        const resp = response?.data?.data;
        setPagination(resp.pagination);
        setHistoryTickets(resp.tickets);
      }
  }


  const paginationHandler = (event, value) => {
    console.log("value--------", value)
    fetchData(value, null);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Ticket History
      </Typography>

      {historyTickets && historyTickets?.length === 0 ? (
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No approved tickets found.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <table
            border="1"
            cellPadding={10}
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Created By</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(historyTickets)?.map(([ticketId, log]) => (
                <React.Fragment key={ticketId}>
                  <tr>
                    <td>{log.ticket_id}</td>
                    <td>{log.created_by}</td>
                    <td>{new Date(log.created_at).toLocaleString()}</td>
                  </tr>

                  <tr style={{ borderBottom: "none" }}>
                    <td colSpan={3} style={{ borderBottom: "none" }}>
                      <strong>Title:</strong> {log.title} <br />
                      <strong>Description:</strong> {log.description}
                    </td>
                  </tr>

                  {/* Third Row: Journey */}
                  <tr>
                    <td colSpan={3} style={{ borderTop: "none" }}>
                      <ol style={{ margin: 0, paddingLeft: "1.2em" }}>
                        {log?.journey?.map((entry, index) => (
                          <li key={index}>
                            <strong>
                              {new Date(entry.updated_at).toLocaleString()}
                            </strong>{" "}
                            &rarr; {entry.updated_by || "System"} &rarr;
                            Priority: {entry.priority} &rarr; Status:{" "}
                            {entry.status}
                          </li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
     {pagination?.pageCount &&
      <Pagination
        sx={{display: "flex", justifyContent: "center", mt: 2}}
        count={pagination.pageCount}
        page={pagination.page}
        onChange={paginationHandler}
        color="primary"
      />
     }
    </>
  );
}
