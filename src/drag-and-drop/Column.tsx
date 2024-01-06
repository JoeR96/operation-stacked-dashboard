import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Typography } from '@mui/material';
import Card from './Card';

const Column = ({ columnId, items, deleteExercise }) => (
    <Box key={columnId} style={{ display: 'inline-block', margin: '8px' }}>
        <Typography variant="h6" align="center" style={{ marginBottom: '8px' }}>
            {columnId}
        </Typography>
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                        border: '1px solid lightgrey',
                        minHeight: '100px',
                        width: '250px',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {items.map((item, index) => (
                        <Card
                            key={item.id}
                            item={item}
                            index={index}
                            columnId={columnId}
                            deleteExercise={deleteExercise}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </Box>
);

export default Column;
