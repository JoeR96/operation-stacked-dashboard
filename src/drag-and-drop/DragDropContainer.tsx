import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import Column from './Column';

const DragDropContainer = () => {
    const [columns, setColumns] = useState({});
    const [columnCount, setColumnCount] = useState(0);

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        // Check if the location of the draggable changed
        if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn];
            const destItems = destination.droppableId === source.droppableId ? sourceItems : [...destColumn];
            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destItems
            });
        }
    };

    const handleAddColumn = () => {
        const newColumnId = `column-${columnCount}`;
        setColumnCount(columnCount + 1);
        setColumns({
            ...columns,
            [newColumnId]: []
        });
    };

    const handleRemoveColumn = () => {
        if (columnCount > 0) {
            const newColumns = { ...columns };
            const columnIdToDelete = `column-${columnCount - 1}`;
            delete newColumns[columnIdToDelete];
            setColumnCount(columnCount - 1);
            setColumns(newColumns);
        }
    };

    const deleteExercise = (columnId, index) => {
        const newColumn = [...columns[columnId]];
        newColumn.splice(index, 1);
        setColumns({
            ...columns,
            [columnId]: newColumn
        });
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(columns).map(([columnId, items]) => (
                    <Column
                        key={columnId}
                        columnId={columnId}
                        items={items}
                        deleteExercise={(index) => deleteExercise(columnId, index)}
                    />
                ))}
            </DragDropContext>
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                <Button onClick={handleAddColumn} variant="contained" color="primary">Add Column</Button>
                <Button onClick={handleRemoveColumn} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Remove Column</Button>
            </Box>
        </div>
    );
};

export default DragDropContainer;
