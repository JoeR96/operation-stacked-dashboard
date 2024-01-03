import React, { useState, useEffect } from 'react';
import { WorkoutMainContent } from "../../components/Workout/WorkoutMainContent";
import WorkoutTabbedDisplay from "../../components/Workout/WorkoutTabbedDisplay";
import { Box } from "@mui/material";
import { WorkoutApi } from '../../services/api';
import Spinner from "../../components/spinner/Spinner";
import {useAuthStore} from "../../state/auth/authStore"; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const WorkoutPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useAuthStore(state => state.getUserId());
    const navigate = useNavigate();

    const fetchWorkouts = async () => {
        const workoutApi = new WorkoutApi();
        try {
            const response = await workoutApi.workoutUserIdWorkoutsGet(userId);
            console.log("workouts", response);
            setWorkouts(response.data);
            setError(null); // Reset error on successful fetch
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setError('Failed to fetch workouts');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    if (isLoading) {
        return <Spinner />; // Show spinner while loading
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if any
    }

    if (workouts.length > 0) {
        return (
            <Box textAlign="center" marginTop="20px">
                <div>No workouts created!</div>
                <button onClick={() => {navigate('/create-workout');
}}>
                    Create Workout
                </button>
            </Box>
        );
    }

    return (
        <div>
            <WorkoutMainContent selectedTab={selectedTab} />
            <WorkoutTabbedDisplay selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
    );
};

export default WorkoutPage;
