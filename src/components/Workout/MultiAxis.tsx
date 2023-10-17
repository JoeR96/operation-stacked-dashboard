import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Chance from 'chance';

const chance = new Chance();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

interface MultiAxisProps {
    maintainAspectRatio?: boolean;
}

export function MultiAxis({ maintainAspectRatio = false }: MultiAxisProps) {

    const options = {
        responsive: true,
        maintainAspectRatio: !maintainAspectRatio,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
            color: 'white', // Set title text color to white
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            ticks: {
              color: 'white', // Set Y-axis ticks color to white
            },
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: 'white', // Set Y1-axis ticks color to white
            },
          },
        },
      };
      

    return (
        <Line options={options} data={data} />
    );
}

export default MultiAxis;
