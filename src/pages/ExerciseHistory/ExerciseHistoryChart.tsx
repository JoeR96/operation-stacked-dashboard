import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale // Include TimeScale for time-based charts
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // This is still needed for date handling
import { ExerciseHistoryApi } from "../../services/api";
import Spinner from "../../components/spinner/Spinner";

// Register the components you are using in your chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const ExerciseHistoryChart = ({ exerciseIds, maintainAspectRatio = false }) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Set initial state to true
    const [error, setError] = useState(null);
    const exerciseHistoryApi = new ExerciseHistoryApi(); // Instantiate the API class

    // Fetch exercise history data
    const fetchExerciseHistoryData = async () => {
        try {
            setIsLoading(true); // Set loading state to true before making the request
            const response = await exerciseHistoryApi.allPost(exerciseIds);
            setIsLoading(false)
            return response.data;
        } catch (error) {
            setError(error);
            setIsLoading(false); // Set loading state to false in case of an error
        }
    };

    // Transform API data to chart format
    const transformDataForChart = (data) => {
        const exerciseMap = new Map();
console.log(data)
        data.forEach((history) => {
            console.log(history)
            const exerciseName = history.Exercise?.ExerciseName || 'Unknown Exercise';
            const entry = {
                x: new Date(history.CompletedDate),
                y: history.WorkingWeight
            };

            if (!exerciseMap.has(exerciseName)) {
                exerciseMap.set(exerciseName, {
                    label: exerciseName,
                    data: [],
                    borderColor: getRandomColor(),
                    fill: false,
                    tension: 0.1
                });
            }

            exerciseMap.get(exerciseName).data.push(entry);
        });

        return { datasets: Array.from(exerciseMap.values()) };
    };

    // Generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // useEffect hook to fetch and set data
    useEffect(() => {
        // Check if exerciseIds is empty, and if so, clear the chart data and return
        if (exerciseIds.length === 0) {
            setChartData(null);
            return;
        }

        fetchExerciseHistoryData()
            .then(data => {
                if (data) {
                    const transformedChartData = transformDataForChart(data);
                    setChartData(transformedChartData);
                }
            });

        // Cleanup is not needed as ref is no longer used
    }, [exerciseIds]);

    if (exerciseIds.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Please select an exercise to view its history.</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '500px' }}>
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <div>Error fetching data: {error.message}</div>
            ) : !chartData ? (
                <div>No data available</div>
            ) : (
                <Line
                    data={chartData}
                    options={{
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'week',
                                    tooltipFormat: 'MMM dd'
                                },
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Weight'
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: maintainAspectRatio
                    }}
                />
            )}
        </div>
    );
};

export default ExerciseHistoryChart;
