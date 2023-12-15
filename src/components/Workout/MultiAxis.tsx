// noinspection TypeScriptValidateTypes

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { TimeScale } from 'chart.js';

interface MultiAxisProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: { x: string, y: number }[];
            borderColor: string;
            backgroundColor: string;
        }[];
    };
    maintainAspectRatio?: boolean;
}

export function MultiAxis({ data, maintainAspectRatio = false }: MultiAxisProps) {
    // Determine the maximum weight
    let maxWeight = 0;
    data.datasets.forEach(dataset => {
        dataset.data.forEach(point => {
            if (point.y > maxWeight) {
                maxWeight = point.y;
            }
        });
    });

    const options = {
        responsive: true,
        maintainAspectRatio: maintainAspectRatio,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', // Adjusted to 'day' for more granularity
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Weight'
                },
                min: 0, // Start from 0
                max: maxWeight, // Maximum weight from the data
            }
        },
        plugins: {
            legend: {
                position: 'top' as const, // Adding 'as const' ensures the type is narrowed to the literal 'top'
            },
            title: {
                display: true,
                text: 'Exercise Progress Over Time',
            },
        },
    };

    return (
            <Line options={options} data={data} />
    );
}

export default MultiAxis;
