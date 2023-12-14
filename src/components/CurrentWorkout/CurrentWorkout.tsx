import { useEffect, useState } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { EquipmentType } from '../../types/types';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';
import { useAuthStore } from '../../state/auth/authStore';
import { useUserStore } from '../../state/userStore';
import Spinner from '../spinner/Spinner';
import {WorkoutApi} from "../../services/api";

const CurrentWorkout = () => {
    const { Week: userWeek, Day: userDay } = useUserStore();
    const [exercises, setExercises] = useState(null);
    const userId = useAuthStore(state => state.getUserId()); // Using the selector to get userId

    const week = userWeek || 1;
    const day = userDay || 1;
    const defaultCompleted = false;
    const workoutApi = new WorkoutApi();

    const {
        data: fetchedExercises,
        apiStatus,
        error,
        exec
    } = useApi(async () => await fetchWorkout(week,day,defaultCompleted));

    useEffect(() => {
        exec();
    }, []);

    useEffect(() => {
        if (fetchedExercises) {
            console.log(fetchedExercises)
            setExercises(fetchedExercises);
        }
    }, [fetchedExercises]);

    const fetchWorkout = async (week,day,defaultCompleted) => {
        try {
            const response = await workoutApi.workoutUserIdWeekDayCompletedGet(userId,week,day,defaultCompleted);
            console.log(response.data.Exercises); // Logs the actual response
            return response.data.Exercises;
        } catch (error) {
            console.error("Error fetching workouts:", error);
            throw error;
        }
    };

    const [editingId, setEditingId] = useState(null);
    const [tempData, setTempData] = useState({});

    const startEditing = (exercise) => {
        setEditingId(exercise.Id);
        setTempData({
            MinimumReps: exercise.MinimumReps,
            MaximumReps: exercise.MaximumReps,
            Sets: exercise.Sets,
            WorkingWeight: exercise.WorkingWeight,
        });
    };

    const saveChanges = () => {
        const dataToLog = {
            exerciseId: editingId, // use the key 'exerciseId'
            completedSets: [
                ...tempData
            ]
        };

        updateWorkout(dataToLog);

        setEditingId(null);
        setTempData({});
    };
    const completeExercise = async (exerciseId, completedSetsData) => {
        const requestBody = {
            Id: exerciseId,
            Reps: completedSetsData, // This assumes completedSetsData is an array of reps for each set.
            Sets: completedSetsData.length // Number of completed sets
        };

        try {
            const response = await apiRequest(
                "POST", // or "POST" if that's the appropriate HTTP verb for completing an exercise on your server
                "/workout-creation/complete",
                44382, // assuming this is the port number
                requestBody
            );
            return response;
        } catch (error) {
            console.error("Error completing exercise:", error);
            throw error;
        }
    };

    const updateWorkout = async (data) => {
        try {
            const response = await apiRequest(
                "PUT",
                "/workout-creation/update",
                44382,
                data
            );

            if (response && exercises) {
                const updatedExercises = exercises.Exercises.map(exercise => {
                    return exercise.Id === response.Id ? response : exercise;
                });

                setExercises({ ...exercises, Exercises: updatedExercises });
            }

            return response;
        } catch (error) {
            console.error("Error updating workout:", error);
            throw error;
        }
    };

    const cancelChanges = () => {
        setEditingId(null);
        setTempData({});
    };

    const [showForm, setShowForm] = useState(false);
    const [currentExerciseId, setCurrentExerciseId] = useState(null);
    const [completedSetsData, setCompletedSetsData] = useState([]);

    const handleExerciseSubmission = () => {
        completeExercise(currentExerciseId, completedSetsData);
        setShowForm(false); // Close the form after submission.
    };


    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    return (
        <Paper elevation={3} style={{ backgroundColor: "#242424" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Exercise</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Week</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Day</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Minimum Reps</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Maximum Reps</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Sets</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Working Weight</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Equipment Type</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Submit</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Edit</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {}    {exercises?.map((exercise) => (
                    <TableRow key={exercise.Id} style={exercise.Id === editingId ? { backgroundColor: '#333333' } : {}}>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.Exercise.ExerciseName}</TableCell>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.LinearProgressionExercises[0].LiftWeek}</TableCell>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.LiftDay}</TableCell>

                        {exercise.Id === editingId ? (
                            <>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={tempData.MinimumReps}
                                        onChange={e => {
                                            const value = parseInt(e.target.value);
                                            if (value <= tempData.MaximumReps) {
                                                setTempData({ ...tempData, MinimumReps: value });
                                            }
                                        }}
                                        style={{ width: '60px', color: "white", fontWeight: 'bold', backgroundColor: "#333333", border: 'none' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={tempData.MaximumReps}
                                        onChange={e => {
                                            const value = parseInt(e.target.value);
                                            if (value >= tempData.MinimumReps) {
                                                setTempData({ ...tempData, MaximumReps: value });
                                            }
                                        }}
                                        style={{ width: '60px', color: "white", fontWeight: 'bold', backgroundColor: "#333333", border: 'none' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="number"
                                        value={tempData.Sets}
                                        onChange={e => setTempData({ ...tempData, Sets: parseInt(e.target.value) })}
                                        style={{ width: '60px', color: "white", fontWeight: 'bold', backgroundColor: "#333333", border: 'none' }}
                                    />
                                </TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>
                                    <div style={{ position: 'relative', width: '70px' }}>
                                        <input
                                            type="number"
                                            value={tempData.WorkingWeight}
                                            onChange={e => {
                                                const value = parseInt(e.target.value);
                                                if (value > 0) {
                                                    setTempData({ ...tempData, WorkingWeight: value });
                                                }
                                            }}
                                            style={{
                                                width: '100%',
                                                color: "white",
                                                fontWeight: 'bold',
                                                backgroundColor: "#333333",
                                                border: 'none',
                                                paddingRight: '20px' // Add padding so KG does not overlap numbers
                                            }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            right: '0px',
                                            top: '50%',
                                            transform: 'translateX(-125%) translateY(-50%)',
                                            color: "white",
                                            fontWeight: 'bold'
                                        }}>
    KG
</span>

                                    </div>

                                </TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.MinimumReps}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.MaximumReps}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.Sets}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{exercise.LinearProgressionExercises[0].WorkingWeight} KG</TableCell>
                            </>
                        )}

                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>
                            {EquipmentType[exercise.Exercise.EquipmentType]}
                        </TableCell>
                        <TableCell>
                            {exercise.Id === editingId ? null : (
                                <button onClick={() => {
                                    setShowForm(true);
                                    setCurrentExerciseId(exercise.Id);
                                    setCompletedSetsData(Array(exercise.Sets).fill(''));  // Initializing with the number of sets for this exercise
                                }}>
                                    Submit
                                </button>
                            )}
                        </TableCell>

                        <TableCell>
                            {exercise.Id === editingId ? (
                                <>
                                    <button onClick={saveChanges}>Submit</button>
                                    <button onClick={cancelChanges}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => startEditing(exercise)}>Edit</button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
                    {showForm && (
                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                            {completedSetsData.map((set, index) => (
                                <div key={index}>
                                    <label>Set {index + 1}: </label>
                                    <input
                                        type="number"
                                        value={set}
                                        onChange={e => {
                                            const newData = [...completedSetsData];
                                            newData[index] = e.target.value;
                                            setCompletedSetsData(newData);
                                        }}
                                    />
                                </div>
                            ))}
                            <button onClick={handleExerciseSubmission}>Submit Exercise</button>
                            <button onClick={() => setShowForm(false)}>Close</button>
                        </div>
                    )}

                </TableBody>

            </Table>

        </Paper>
    );
}

const fetchCurrentWorkout = async (userId, Week, Day, Completed) => {
    try {
        const response = await apiRequest(
            "GET",
            `/workout-creation/${userId}/${Week}/${Day}/${Completed}`,
            5002
        );
        return response;
    } catch (error) {
        console.error("Error fetching current workout:", error);
        throw error;
    }
};

export default CurrentWorkout;