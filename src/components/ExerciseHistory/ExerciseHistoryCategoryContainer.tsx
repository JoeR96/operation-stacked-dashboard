import React from 'react';
import { Exercise, Category } from "../../types/types";
import { Grid, Paper, Button, Typography } from '@mui/material';
import useThemeStore from "../../state/themeStore";

interface ExerciseHistoryCategoryContainerProps {
    exercises: Exercise[];
    category: Category;
    onToggleGraph: (id: string) => void;
    isAddedToGraph: (id: string) => boolean;
    onSetActiveInHistory: (id: string) => void;
}
export const ExerciseHistoryCategoryContainer: React.FC<ExerciseHistoryCategoryContainerProps> = ({
                                                                                                      exercises,
                                                                                                      category,
                                                                                                      onToggleGraph,
                                                                                                      isAddedToGraph,
                                                                                                      onSetActiveInHistory,
                                                                                                  }) => {
    const themeColors = useThemeStore((state) => state.colors);

    const buttonStyle = {
        backgroundColor: themeColors.primary,
        color: themeColors.text,
        height: '36px',
        fontSize: '0.8rem', // Reduced font size
        padding: '6px 12px', // Adjust padding to ensure text fits
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant="h5" style={{ color: themeColors.text, marginBottom: '20px' }}>
                {Category[category]}
            </Typography>
            <Paper style={{ backgroundColor: themeColors.background, padding: '10px' }}>
                <Grid container spacing={2}>
                    {exercises.map((exercise) => (
                        <React.Fragment key={exercise.Id}>
                            <Grid item xs={12}>
                                <Typography style={{ fontSize: '1rem', fontWeight: 'bold', color: themeColors.text }}>
                                    {exercise.ExerciseName}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    style={{ ...buttonStyle, backgroundColor: themeColors.primary }}
                                    onClick={() => onSetActiveInHistory(exercise.Id as string)}
                                >
                                    Set Active In History Table
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    style={{ ...buttonStyle, backgroundColor: themeColors.secondary }}
                                    onClick={() => onToggleGraph(exercise.Id as string)}
                                >
                                    {isAddedToGraph(exercise.Id as string) ? 'Remove from Graph' : 'Add to Graph'}
                                </Button>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
};
