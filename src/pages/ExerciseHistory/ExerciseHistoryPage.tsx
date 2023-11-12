import React, {useState} from 'react'
import {Box} from "@mui/material";
import {ExercisesTable} from "../../components/Exercise/ExerciseTable.tsx";
import LineChart from "../../components/Workout/LineChart.tsx";

const ExerciseHistoryPage = () => {
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    const handleCompleteClick = (exerciseId) => {
        setSelectedExerciseId(exerciseId);
    };
    return (
        <Box>
            <LineChart maintainAspectRatio={true} />
            <ExercisesTable onCompleteClick={() => handleCompleteClick} userId={"lol"}/>
        </Box>
    )
}

export default ExerciseHistoryPage
