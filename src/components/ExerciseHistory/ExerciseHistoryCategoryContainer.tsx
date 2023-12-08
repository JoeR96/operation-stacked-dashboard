import React from 'react';
import { Exercise, Category } from "../../types/types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import useThemeStore from "../../state/themeStore";

export const ExerciseHistoryCategoryContainer: React.FC<ExerciseHistoryCategoryContainerProps> = ({
                                                                                                      exercises,
                                                                                                      category,
                                                                                                      onToggleGraph,
                                                                                                      isAddedToGraph,
                                                                                                      onSetActiveInHistory,
                                                                                                  }) => {
    const themeColors = useThemeStore((state) => state.colors); // Get theme colors from the store

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: themeColors.text }}>{Category[category]}</h2>
            <TableContainer component={Paper} style={{ backgroundColor: themeColors.background }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Exercise Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                                <TableCell>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: themeColors.text }}>
                    {exercise.ExerciseName}
                  </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        style={{ backgroundColor: themeColors.primary, color: themeColors.text }}
                                        onClick={() => onSetActiveInHistory(exercise.Id)}
                                    >
                                        Set Active In History Table
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
                                        onClick={() => onToggleGraph(exercise.Id)}
                                    >
                                        {isAddedToGraph(exercise.Id) ? 'Remove from Graph' : 'Add to Graph'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
