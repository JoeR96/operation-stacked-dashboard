import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useApi } from '../../api/constants/hooks/useApi'; // Ensure useApi is correctly imported
import Spinner from '../spinner/Spinner';
import {ERROR, PENDING} from "../../api/constants/apiStatus.ts"; // Ensure Spinner is correctly imported

export const ExercisesTable = ({ userId }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;

    // Mock API response
    const mockApiResponse = [
        {
            Id: '1',
            ExerciseName: 'Bench Press',
            Category: 'Chest',
            EquipmentType: 'Barbell',
            UserId: '894ce6d3-6990-454d-ba92-17a61d518d8c',
            ExerciseHistories: [],
        },
        {
            Id: '2',
            ExerciseName: 'Squat',
            Category: 'Legs',
            EquipmentType: 'Barbell',
            UserId: '894ce6d3-6990-454d-ba92-17a61d518d8c',
            ExerciseHistories: [],
        },
    ];

    const {
        data: exercises,
        apiStatus,
        error,
        exec
    } = useApi(async () => {
        // Simulate an API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockApiResponse), 1000);
        });
    });

    useEffect(() => {
        exec();
    }, [exec, pageIndex, pageSize]);

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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
