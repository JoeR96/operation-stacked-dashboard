import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Card = ({ item, index, columnId, deleteExercise }) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
            <Paper
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    margin: '0 0 8px 0',
                    padding: 16,
                    backgroundColor: '#ffa726',
                    color: 'black',
                }}
            >
                {/* Add content of your card here */}
                <IconButton
                    onClick={() => deleteExercise(columnId, index)}
                    style={{ position: 'absolute', top: 5, right: 5, color: 'black' }}
                >
                    <CloseIcon />
                </IconButton>
            </Paper>
        )}
    </Draggable>
);

export default Card;
