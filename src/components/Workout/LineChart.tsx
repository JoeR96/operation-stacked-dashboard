import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Chance from 'chance';

const chance = new Chance();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
    maintainAspectRatio?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ maintainAspectRatio = false }) => {
  const labels = ['January', 'February', 'March'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => chance.integer({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => chance.integer({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: !maintainAspectRatio,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white', // Set legend text color to white
        },
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
        color: 'white', // Set title text color to white
      },
    },
    scales: {
      x: {
        grid: {
          color: 'white', // Set X-axis grid lines color to white
        },
        ticks: {
          color: 'white', // Set X-axis ticks color to white
        },
      },
      y: {
        grid: {
          color: 'white', // Set Y-axis grid lines color to white
        },
        ticks: {
          color: 'white', // Set Y-axis ticks color to white
        },
      },
    },
  };
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default LineChart;
