import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ColumnSelector from './ColumnSelector';
import WorkoutDayColumn from "./WorkoutDayColumn .tsx";

const WorkoutWeek = ({ numColumns, onColumnChange, selectedColumn, onColumnSelect, exercisesByColumn, updateExercisesByColumn }) => {

    const handleDragEnd = (result) => {
        console.log("Before updating drag and drop:", exercisesByColumn);
        const { source, destination } = result;

        // Exit if dropped outside a droppable area or in the same place
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        // Retrieve the current columns of the source and destination
        const startExercises = Array.from(exercisesByColumn[source.droppableId] || []);
        const finishExercises = source.droppableId === destination.droppableId ?
            startExercises :
            Array.from(exercisesByColumn[destination.droppableId] || []);

        // Remove the exercise from the source column
        const [movedExercise] = startExercises.splice(source.index, 1);

        // If moving within the same list, adjust the position
        if (source.droppableId === destination.droppableId) {
            startExercises.splice(destination.index, 0, movedExercise);
        } else {
            // If moving to a different list, add the exercise to the destination column
            finishExercises.splice(destination.index, 0, movedExercise);
        }

        // Create a new state object for exercisesByColumn
        const newExercisesByColumn = {
            ...exercisesByColumn,
            [source.droppableId]: startExercises,
            [destination.droppableId]: finishExercises
        };

        // Update the exercisesByColumn state in the parent component
        updateExercisesByColumn(newExercisesByColumn);
        console.log("After updating drag and drop:", newExercisesByColumn);

    };


    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <ColumnSelector numColumns={numColumns} onColumnChange={onColumnChange} />
            {Array.from({ length: numColumns }, (_, i) => i + 1).map((day) => (
                <WorkoutDayColumn
                    key={day}
                    day={day}
                    exercises={exercisesByColumn[day] || []}
                    isSelected={day === selectedColumn}
                    onSelect={onColumnSelect}
                />
            ))}
        </DragDropContext>
    );
};

export default WorkoutWeek;
