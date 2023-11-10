import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useApi } from '../../api/constants/hooks/useApi'; // Ensure useApi is correctly imported
import Spinner from '../spinner/Spinner';
import {ERROR, PENDING} from "../../api/constants/apiStatus.ts";
import {ExerciseApi} from "../../services/api"; // Ensure Spinner is correctly imported

export const ExercisesTable = ({ userId, onCompleteClick}) => {
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;
    const exercisApi : ExerciseApi = new ExerciseApi();

    const fetchExercises = async () => {
        try {
            const response = await exercisApi.exerciseUserIdAllGet("5af5dae7-801e-47c0-bfc9-3eac5b25491c")
            console.log(response.data.$values
            )            
            return response.data.$values;
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
                            <TableCell style={{ color: "white" }}>{exercise.Category}</TableCell>
                            <TableCell style={{ color: "white" }}>{exercise.EquipmentType}</TableCell>
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
