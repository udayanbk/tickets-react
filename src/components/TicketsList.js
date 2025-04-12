import React, { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

import Analytics from "./Analytics";
import TicketHistory from "./TicketHistory";
import TicketBucket from "./TicketBucket";
import NewTicket from "./NewTicket";

const TicketsList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <NewTicket />
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Ticket Bucket" />
        <Tab label="Ticket History" />
        <Tab label="Analytics" />
      </Tabs>

      <Paper sx={{ p: 3, mt: 2 }}>
        {activeTab === 0 && <TicketBucket />}
        {activeTab === 1 && <TicketHistory />}
        {activeTab === 2 && <Analytics />}
      </Paper>
    </>
  );
};

export default TicketsList;
