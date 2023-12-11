import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, Button} from '@mui/material';
import { useApi } from '../../api/constants/hooks/useApi'; // Ensure useApi is correctly imported
import Spinner from '../spinner/Spinner';
import {ERROR, PENDING} from "../../api/constants/apiStatus.ts";
import {ExerciseApi} from "../../services/api";
import {useAuthStore} from "../../state/auth/authStore";
import {Category, EquipmentType} from "../../types/types"; // Ensure Spinner is correctly imported

export const ExercisesTable = ({ onCompleteClick }) => {
    const exercisApi : ExerciseApi = new ExerciseApi();
    const userId = useAuthStore(state => state.getUserId()); // Using the selector to get userId

    const fetchExercises = async () => {
        try {
            const response = await exercisApi.exerciseUserIdAllGet(userId)
            return response.data;
        } catch (error) {
            console.error("Error fetching workouts:", error);
            throw error;
        }
    }
    const {
        data: exercises,
        apiStatus,
        error,
        exec
    } = useApi(async () =>  await fetchExercises());

    useEffect(() => {
        console.log('retrieving')
        exec();
    },[] );

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    if (!exercises || exercises.length === 0) return <div>No exercises found</div>;
    return (
        <Paper style={{ backgroundColor: "#242424" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>Exercise Name</TableCell>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>Category</TableCell>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>Equipment Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercises.map((exercise) => (
                        <TableRow key={exercise.Id}>
                            <TableCell style={{ color: "white" }}>{exercise.ExerciseName}</TableCell>
                            <TableCell style={{ color: "white" }}> {Category[exercise.Category]}</TableCell>
                            <TableCell style={{ color: "white" }}> {EquipmentType[exercise.EquipmentType]}</TableCell>

                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => onCompleteClick(exercise.Id)}
                                >
                                    Complete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
