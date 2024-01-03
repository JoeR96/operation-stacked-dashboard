            import React, { useState } from 'react';
            import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
            import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
            import { ExercisesTable } from '../../components/Exercise/ExerciseTable';
            import { EquipmentType } from '../../types/types';
            import WorkoutExerciseForm from '../../components/WorkoutExercise/WorkoutExerciseForm';
            // import { CreateWorkoutExerciseRequest } from '../../services/api'; // Uncomment if needed
            import CloseIcon from '@mui/icons-material/Close';
            import barbellImage from './barbell.png';
            import smithMachineImage from './smithMachine.png';
            import dumbbellImage from './dumbell.png';
            import machineImage from './machine.png';
            import cableMachineImage from './cableMachine.png';
            const CreateWorkoutContainer = () => {
                const [columnCount, setColumnCount] = useState(0);
                const [columns, setColumns] = useState({});
                const [activeColumn, setActiveColumn] = useState(null);
                const [isFormOpen, setFormOpen] = useState(false);
                const [selectedExercise, setSelectedExercise] = useState(null);

                const handleIncrease = () => {
                    const newColumnId = `column-${columnCount}`;
                    setColumnCount((prevCount) => prevCount + 1);
                    setColumns((prevColumns) => ({ ...prevColumns, [newColumnId]: [] }));
                };

                const handleDecrease = () => {
                    if (columnCount > 0) {
                        const columnIdToDelete = `column-${columnCount - 1}`;
                        setColumnCount((prevCount) => prevCount - 1);
                        setColumns((prevColumns) => {
                            const newColumns = { ...prevColumns };
                            delete newColumns[columnIdToDelete];
                            return newColumns;
                        });
                        if (activeColumn === columnIdToDelete) {
                            setActiveColumn(null);
                        }
                    }
                };

                const populateWorkoutExerciseSettings = (exercise) => {
                    setSelectedExercise(exercise);
                    setFormOpen(true);
                };

                    const handleFormSubmit = (formValues) => {
                        const combinedData = {
                            ...formValues,
                            selectedExercise, // Assuming selectedExercise contains ExerciseName, EquipmentType, etc.
                            id: `item-${columns[activeColumn]?.length ?? 0}-${selectedExercise.ExerciseName}`,
                        };
                        console.log("combined data",combinedData)
                    addExerciseToColumn(combinedData);
                    setFormOpen(false);
                };

                const addExerciseToColumn = (combinedData) => {
                    if (activeColumn && columns[activeColumn] !== undefined) {
                        setColumns((prevColumns) => ({
                            ...prevColumns,
                            [activeColumn]: [...prevColumns[activeColumn], combinedData],
                        }));
                    }
                };

                const deleteExercise = (columnId, index) => {
                    const updatedColumn = [...columns[columnId]];
                    updatedColumn.splice(index, 1);
                    setColumns((prevColumns) => ({ ...prevColumns, [columnId]: updatedColumn }));
                };

                const onDragEnd = (result) => {
                    const { source, destination } = result;
                    if (!destination) {
                        return;
                    }
                    if (source.droppableId === destination.droppableId) {
                        const reorderedItems = reorder(columns[source.droppableId], source.index, destination.index);
                        setColumns((prevColumns) => ({
                            ...prevColumns,
                            [source.droppableId]: reorderedItems,
                        }));
                    } else {
                        const result = move(columns[source.droppableId], columns[destination.droppableId], source, destination);
                        setColumns((prevColumns) => ({
                            ...prevColumns,
                            [source.droppableId]: result[source.droppableId],
                            [destination.droppableId]: result[destination.droppableId],
                        }));
                    }
                };
                const getEquipmentImage = (equipmentType) => {
                    switch (equipmentType) {
                        case EquipmentType.Barbell:
                            return barbellImage;
                        case EquipmentType.SmithMachine:
                            return smithMachineImage;
                        case EquipmentType.Dumbbell:
                            return dumbbellImage;
                        case EquipmentType.Machine:
                            return machineImage;
                        case EquipmentType.Cable:
                            return cableMachineImage;
                        default:
                            return barbellImage;
                    }
                };
                return (
                    <div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {Object.entries(columns).map(([columnId, items], index) => (
                                <Box key={columnId} style={{ display: 'inline-block', margin: '8px' }}>
                                    <Typography variant="h6" align="center" style={{ marginBottom: '8px' }}>
                                        Day {index + 1}
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
                                                    backgroundColor: columnId === activeColumn ? '#f0f0f0' : '#fff',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                                onClick={() => setActiveColumn(columnId)}
                                            >
                                                {items.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided) => (
                                                    <Paper
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            margin: '0 0 8px 0',
                                                            padding: 16,
                                                            backgroundColor: '#ffa726', // Orange color
                                                            color: 'black',
                                                        }}
                                                    >
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                                            {item.selectedExercise.ExerciseName}
                                                            </Grid>
                                                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                                            {item.Template}
                                                            </Grid>
                                                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                                                <img
                                                                    src={getEquipmentImage(item.EquipmentType)}
                                                                    alt={EquipmentType[item.EquipmentType]}
                                                                    style={{ width: '30px', height: '30px' }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <Typography>Rest Timer: {item.RestTimer}</Typography>
                                                                <Typography>Reps: {item.MinimumReps} - {item.MaximumReps}</Typography>
                                                                <Typography>Sets: {item.Sets} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <IconButton 
                                                            onClick={() => deleteExercise(columnId, index)}
                                                            style={{ position: 'absolute', top: 5, right: 5, color: 'black' }}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </Paper>

                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Box>
                            ))}
                        </DragDropContext>
                        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                            <Button onClick={handleDecrease} variant="contained" color="primary">-</Button>
                            <Button onClick={handleIncrease} variant="contained" color="primary" style={{ marginLeft: '10px' }}>+</Button>
                        </Box>
                        <ExercisesTable onCompleteClick={populateWorkoutExerciseSettings} />
                        <Dialog open={isFormOpen} onClose={() => setFormOpen(false)}>
                            <DialogTitle>Add Workout Exercise</DialogTitle>
                            <DialogContent>
                                <WorkoutExerciseForm onSubmit={handleFormSubmit} exercise={selectedExercise} />
                            </DialogContent>
                        </Dialog>
                    </div>
                );
            };

            export default CreateWorkoutContainer;
