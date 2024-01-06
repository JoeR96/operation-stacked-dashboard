import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const WorkoutDayColumn = ({ day, exercises, isSelected, onSelect }) => {
    console.log(`Rendering Droppable for day: ${day}, droppableId: ${String(day)}`);
    console.log(typeof(day))
    const handleSelect = () => {
        onSelect(day);
    };

    return (
        <div onClick={handleSelect} style={{ border: isSelected ? '2px solid blue' : 'none' }}>
            <h3>Day {day}</h3>
            <Droppable droppableId={String(day)}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {exercises.map((exercise, index) => {
                            console.log(`Draggable ID for Exercise ${index} on Day ${day}:`, exercise.Id);

                            return (
                                <Draggable key={exercise.Id} draggableId={String(exercise.Id)} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                margin: '0 0 8px 0',
                                                padding: 16,
                                                backgroundColor: '#ffa726',
                                                color: 'black',
                                            }}                                        >
                                            <p>{exercise.ExerciseName}</p> {/* Render ExerciseName */}
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default WorkoutDayColumn;
