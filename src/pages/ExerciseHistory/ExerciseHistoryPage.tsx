import React, { useState, useEffect } from 'react';
import { ExerciseApi } from "../../services/api";
import { ERROR, PENDING } from "../../api/constants/apiStatus";
import Spinner from "../../components/spinner/Spinner";
import { useAuthStore } from "../../state/auth/authStore";
import { ExerciseHistoryCategoryContainer } from "../../components/ExerciseHistory/ExerciseHistoryCategoryContainer";
import { Card, Grid } from "@mui/material";
import { ExerciseHistoryTable } from "../../components/Exercise/ExerciseHistoryTable";
import ExerciseHistoryChart from "./ExerciseHistoryChart";

const ExerciseHistoryPage = () => {
    const [groupedExercises, setGroupedExercises] = useState({});
    const [apiStatus, setApiStatus] = useState('idle');
    const [error, setError] = useState(null);
    const exerciseApi = new ExerciseApi();
    const userId = useAuthStore(state => state.getUserId());
    const [graphExerciseIds, setGraphExerciseIds] = useState<string[]>([]);
    const [graphData, setGraphData] = useState(null);
    const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

    // Function to simulate API call
    const fetchGraphData = async (exerciseId) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

        // Generate mock data based on exerciseId
        const mockData = generateMockDataForExercise(exerciseId);
        setGraphData(mockData);
    };

    const toggleGraph = (exerciseId: string) => {
        const isCurrentlyShown = graphExerciseIds.includes(exerciseId);
        setGraphExerciseIds(isCurrentlyShown ? graphExerciseIds.filter(id => id !== exerciseId) : [...graphExerciseIds, exerciseId]);
    };


    const handleSetActiveInHistory = (exerciseId: string) => {
        setActiveExerciseId(exerciseId);
    };

    const fetchExercises = async () => {
        setApiStatus(PENDING);
        try {
            const response = await exerciseApi.exerciseUserIdAllGet(userId);
            const fetchedExercises = response.data;
            groupExercises(fetchedExercises);
            setApiStatus('success');
        } catch (error) {
            console.error("Error fetching exercises:", error);
            setError(error);
            setApiStatus(ERROR);
        }
    };

    const isAddedToGraph = (exerciseId: string) => {
        return graphExerciseIds.includes(exerciseId);
    };

    const groupExercises = (exercises) => {
        const grouped = exercises.reduce((acc, exercise) => {
            const category = exercise.Category || 'Others';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(exercise);
            return acc;
        }, {});
        setGroupedExercises(grouped);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    if (!groupedExercises) return <div>No exercises found</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%', paddingRight: '16px' }}>
                {/* Chart takes the space it needs */}
                <div style={{ flex: 1 }}>
                    <ExerciseHistoryChart maintainAspectRatio={true} exerciseIds={graphExerciseIds} />
                </div>
                {/* Table takes the remaining space */}
                <div style={{ flex: 'auto' }}>
                    <ExerciseHistoryTable exerciseId={activeExerciseId} />
                </div>
            </div>
            {/* Category containers - a row with two columns */}
            <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflowY: 'auto' }}>
                {Object.entries(groupedExercises).map(([category, exercises], index) => (
                    <div key={category} style={{ width: '33.33%', marginBottom: '8px', flex: '0 0 33.33%' }}>
                        <Card style={{ height: '100%', background: '#f0f0f0' }}>
                            <ExerciseHistoryCategoryContainer
                                exercises={exercises}
                                category={category}
                                onToggleGraph={toggleGraph}
                                onSetActiveInHistory={handleSetActiveInHistory}
                                isAddedToGraph={isAddedToGraph}
                            />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );


};

// Function to generate mock data for a specific exercise ID
const generateMockDataForExercise = (exerciseId) => {
    const exerciseNames = {
        'ex1': 'Bench Press',
        'ex2': 'Deadlift'
        // Add more mappings as needed
    };

    const mockData = {
        labels: [],
        datasets: [{
            label: exerciseNames[exerciseId] || `Exercise ${exerciseId}`,
            data: [],
            borderColor: getRandomColor(),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fill: false
        }]
    };

    // Generate random data points
    for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i * 7); // Weekly data points
        mockData.labels.push(date.toISOString());
        mockData.datasets[0].data.push({
            x: date.toISOString(),
            y: Math.floor(Math.random() * 200) + 20 // Random weight between 20 and 220
        });
    }

    return mockData;
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


export default ExerciseHistoryPage;
