import React, {useEffect, useState} from 'react';
import WorkoutWeekComponent from './WorkoutWeek';
import { Modal } from '@mui/material';
import {ExercisesTable} from "../Exercise/ExerciseTable.tsx";
import WorkoutExerciseForm from "../WorkoutExercise/WorkoutExerciseForm.tsx";
import WorkoutWeek from "./WorkoutWeek";

const CreateWorkoutContainer = () => {
    const [numColumns, setNumColumns] = useState(3);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [exercisesByColumn, setExercisesByColumn] = useState({});
    const [selectedColumn, setSelectedColumn] = useState(null); // or a default column
    const updateExercisesByColumn = (updatedExercises) => {
        setExercisesByColumn(updatedExercises);
        console.log("Updated exercisesByColumn:", updatedExercises);

    };

    useEffect(() => {
        console.log("Current state of exercisesByColumn:", exercisesByColumn);
    }, [exercisesByColumn]);
    const handleColumnChange = (newColumnCount) => {
        setNumColumns(newColumnCount);
    };

    const handleCompleteClick = (exercise) => {
        setSelectedExercise(exercise);
        setIsFormOpen(true); // Open the modal
    };

    const handleFormSubmit = (formData) => {
        if (selectedColumn === null) {
            console.error("No column selected");
            return;
        }

        console.log(selectedExercise)
        const combinedData = {
            ...selectedExercise,
            ...formData,
        };

        const updatedColumn = exercisesByColumn[selectedColumn]
            ? [...exercisesByColumn[selectedColumn], combinedData]
            : [combinedData];

        setExercisesByColumn({
            ...exercisesByColumn,
            [selectedColumn]: updatedColumn
        });

        setIsFormOpen(false);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleColumnSelect = (columnId) => {
        console.log("Column selected:", columnId); // Debugging line
        setSelectedColumn(columnId);
    };


    return (
        <div>
            <h1>Create Your Workout Plan</h1>
            <ExercisesTable onCompleteClick={handleCompleteClick} />
            <Modal open={isFormOpen} onClose={handleFormClose}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    boxShadow: '24',
                    borderRadius: '4px',
                }}>
                    {selectedExercise && (
                        <WorkoutExerciseForm
                            exercise={selectedExercise}
                            onSubmit={handleFormSubmit}
                            onClose={handleFormClose}
                        />
                    )}
                </div>
            </Modal>

            <WorkoutWeek
                numColumns={numColumns}
                onColumnChange={handleColumnChange}
                exercisesByColumn={exercisesByColumn}
                onColumnSelect={handleColumnSelect}
                selectedColumn={selectedColumn}
                updateExercisesByColumn={updateExercisesByColumn}
            />

        </div>
    );
};

export default CreateWorkoutContainer;
