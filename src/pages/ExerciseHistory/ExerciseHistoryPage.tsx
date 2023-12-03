import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import MultiAxis from "../../components/Workout/MultiAxis";
import {ExerciseHistory} from "../../services/api";
import {ExercisesGrouped} from "./ExercisesGrouped.tsx";

const ExerciseHistoryPage = () => {
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
    const [exerciseHistories, setExerciseHistories] = useState<ExerciseHistory[]>([]);
    const mockExerciseHistories = [
        {"Id": "ex1-1", "CompletedDate": "2023-10-22", "CompletedSets": 5, "CompletedReps": "12", "Weight": 65, "ExerciseId": "ex1", "Exercise": {"ExerciseName": "Bench Press"}},
        {"Id": "ex2-1", "CompletedDate": "2023-10-22", "CompletedSets": 9, "CompletedReps": "13", "Weight": 147, "ExerciseId": "ex2", "Exercise": {"ExerciseName": "Deadlift"}},
        {"Id": "ex1-2", "CompletedDate": "2023-10-29", "CompletedSets": 8, "CompletedReps": "11", "Weight": 125, "ExerciseId": "ex1", "Exercise": {"ExerciseName": "Bench Press"}},
        {"Id": "ex2-2", "CompletedDate": "2023-10-29", "CompletedSets": 6, "CompletedReps": "13", "Weight": 169, "ExerciseId": "ex2", "Exercise": {"ExerciseName": "Deadlift"}},
        {"Id": "ex1-3", "CompletedDate": "2023-11-05", "CompletedSets": 7, "CompletedReps": "14", "Weight": 55, "ExerciseId": "ex1", "Exercise": {"ExerciseName": "Bench Press"}},
        {"Id": "ex2-3", "CompletedDate": "2023-11-05", "CompletedSets": 3, "CompletedReps": "9", "Weight": 144, "ExerciseId": "ex2", "Exercise": {"ExerciseName": "Deadlift"}},
        {"Id": "ex1-4", "CompletedDate": "2023-11-12", "CompletedSets": 3, "CompletedReps": "15", "Weight": 121, "ExerciseId": "ex1", "Exercise": {"ExerciseName": "Bench Press"}},
        {"Id": "ex2-4", "CompletedDate": "2023-11-12", "CompletedSets": 3, "CompletedReps": "14", "Weight": 167, "ExerciseId": "ex2", "Exercise": {"ExerciseName": "Deadlift"}},
        {"Id": "ex1-5", "CompletedDate": "2023-11-19", "CompletedSets": 5, "CompletedReps": "10", "Weight": 181, "ExerciseId": "ex1", "Exercise": {"ExerciseName": "Bench Press"}},
        {"Id": "ex2-5", "CompletedDate": "2023-11-19", "CompletedSets": 9, "CompletedReps": "8", "Weight": 141, "ExerciseId": "ex2", "Exercise": {"ExerciseName": "Deadlift"}}
    ]

    useEffect(() => {
        setExerciseHistories(mockExerciseHistories);
    }, []);

const handleCompleteClick = (exerciseId: string) => {
    };

    const chartData = transformDataForChart(mockExerciseHistories);
    console.log(chartData)
    return (
        <Box>
            <MultiAxis data={chartData} maintainAspectRatio={true} />
            <ExercisesGrouped onCompleteClick={handleCompleteClick} userId={"5af5dae7-801e-47c0-bfc9-3eac5b25491c"} />
        </Box>
    );
};

const transformDataForChart = (histories: ExerciseHistory[]) => {
    // Group histories by ExerciseId
    const groupedByExerciseId = histories.reduce((acc, history) => {
        const id = history.ExerciseId;
        if (!acc[id]) {
            acc[id] = [];
        }
        acc[id].push(history);
        return acc;
    }, {} as Record<string, ExerciseHistory[]>);

    // Create a dataset for each group (each exercise)
    const datasets = Object.keys(groupedByExerciseId).map(exerciseId => {
        const exerciseData = groupedByExerciseId[exerciseId];
        const dataPoints = exerciseData.map(history => ({
            x: new Date(history.CompletedDate).toISOString(),
            y: history.Weight
        }));

        return {
            label: exerciseData[0].Exercise?.ExerciseName || `Exercise ${exerciseId}`,
            data: dataPoints,
            borderColor: getRandomColor(),
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
            fill: false
        };
    });

    return {
        labels: histories.map(history => new Date(history.CompletedDate).toISOString()),
        datasets
    };
};

const getRandomColor = () => {
    // Function to generate a random color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};



export default ExerciseHistoryPage;
