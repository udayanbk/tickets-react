import React, { useEffect, useState } from 'react';

const NotificationFeed = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/api/tickets/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('SSE Event Received:', data);

      if (data.type === 'new_ticket') {
        setNotifications(prev => [...prev, `🆕 New Ticket: ${data.ticket.title}`]);
      } else if (data.type === 'ticket_approved') {
        setNotifications(prev => [...prev, `✅ Ticket Approved: ID ${data.ticket.id}`]);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h3>🔔 Real-Time Ticket Updates</h3>
      <ul>
        {notifications.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </div>
  );
};

export default NotificationFeed;
