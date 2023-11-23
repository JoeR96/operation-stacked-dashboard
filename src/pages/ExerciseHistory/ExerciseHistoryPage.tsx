import React, {useEffect, useState} from 'react';
import { Box } from "@mui/material";
import { ExercisesTable } from "../../components/Exercise/ExerciseTable.tsx";
import LineChart from "../../components/Workout/LineChart.tsx";

const ExerciseHistoryPage = () => {
    const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
    useEffect(() => {
        console.log('Selected Exercises Updated:', selectedExerciseIds);
    }, [selectedExerciseIds]); // Dependency array with selectedExerciseIds

    const handleCompleteClick = (exerciseId) => {
        if (selectedExerciseIds.includes(exerciseId)) {
            // Remove exercise from the array if it's already there
            setSelectedExerciseIds(selectedExerciseIds.filter(id => id !== exerciseId));
        } else {
            // Add exercise to the array
            setSelectedExerciseIds([...selectedExerciseIds, exerciseId]);
        }
    };

    return (
        <Box>
            <LineChart  maintainAspectRatio={true} />
            <ExercisesTable onCompleteClick={handleCompleteClick} selectedExercises={selectedExerciseIds} userId={"lol"}/>
        </Box>
    );
}

export default ExerciseHistoryPage;
