import React, { useState } from 'react';
import DragDropContainer from '../../drag-and-drop/DragDropContainer';
import WorkoutExerciseForm from '../../components/WorkoutExercise/WorkoutExerciseForm';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {ExercisesTable} from "../../components/Exercise/ExerciseTable.tsx";

const CreateWorkoutContainer = () => {
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [activeColumn, setActiveColumn] = useState(null);

    const handleExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
        setFormOpen(true);
    };

    const handleFormSubmit = (formValues) => {
        // Assuming formValues contains the necessary data
        // Add the exercise to the active column in DragDropContainer's state
        console.log(formValues, activeColumn);
        setFormOpen(false);
    };

    const handleColumnSelect = (columnId) => {
        setActiveColumn(columnId);
    };

    return (
        <div>
            <h1>Create Workout</h1>
            <DragDropContainer
                onColumnSelect={handleColumnSelect}
                activeColumn={activeColumn}
                // Additional props as needed
            />

            <ExercisesTable onCompleteClick={handleExerciseSelect} />

            <Dialog open={isFormOpen} onClose={() => setFormOpen(false)}>
                <DialogTitle>Add Workout Exercise</DialogTitle>
                <DialogContent>
                    <WorkoutExerciseForm
                        onSubmit={handleFormSubmit}
                        exercise={selectedExercise}
                        onClose={() => setFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateWorkoutContainer;
