import React, { useState, useEffect } from 'react';
import { ExerciseApi } from "../../services/api";
import { ERROR, PENDING } from "../../api/constants/apiStatus";
import Spinner from "../../components/spinner/Spinner";
import { useAuthStore } from "../../state/auth/authStore";
import { ExerciseHistoryCategoryContainer } from "../../components/ExerciseHistory/ExerciseHistoryCategoryContainer";
import { Card, Grid } from "@mui/material";
import ExerciseHistoryChart from "./ExerciseHistoryChart";
import ExerciseHistoryTable from "../../components/Exercise/ExerciseHistoryTable";

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
    const maxComponentHeight = 'calc(45vh - 150px)'; // Adjust this value as needed

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
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '90vh', padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '60%', height: '100%', paddingRight: '16px', padding: '10px' }}>
                {/* Set maximum heights for both chart and table */}
                <div style={{ flex: 1, maxHeight: maxComponentHeight, marginBottom: '16px', padding: '10px' }}>
                    <ExerciseHistoryChart maintainAspectRatio={false} exerciseIds={graphExerciseIds} />
                </div>
                <div style={{ flex: 1, maxHeight: maxComponentHeight, margin: '20px' }}>
                    <ExerciseHistoryTable exerciseId={activeExerciseId} />
                </div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                width: '40%',
                overflowY: 'auto',
                padding: '10px'
            }}>
                {Object.entries(groupedExercises).map(([category, exercises]) => (
                    <div key={category} style={{ marginBottom: '8px' }}>
                        <Card style={{ background: '#FFA500' }}>
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
