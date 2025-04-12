import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllTickets } from '../api/ticket_api';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Analytics = () => {

  const [tickets, setTickets] = useState();

  useEffect(()=>{
    allTickets();
  }, [])

  const allTickets = async () => {
    const resp = await getAllTickets();
    if(resp?.data?.data){
      setTickets(resp?.data?.data)
    }
    console.log("tickets data", resp);
  }

  return (
    <>
    <Box>
      {tickets &&
        <Bar 
          data={tickets}
        />
      }
    </Box>
    </>
  )
}

export default Analytics;