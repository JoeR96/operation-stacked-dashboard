import React, {useState} from 'react'
import {WorkoutMainContent} from "../../components/Workout/WorkoutMainContent";
import WorkoutTabbedDisplay from "../../components/Workout/WorkoutTabbedDisplay";
import {Box} from "@mui/material";

const WorkoutPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <WorkoutMainContent selectedTab = { selectedTab } />
            <WorkoutTabbedDisplay selectedTab = { selectedTab } setSelectedTab={ setSelectedTab} />
        </div>
    )
}

export default WorkoutPage;
