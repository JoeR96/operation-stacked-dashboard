import React, { useState, useEffect } from 'react';
import {TextField, Button, Box, Grid} from '@mui/material';
import useThemeStore from "../../state/themeStore";

const EditEquipmentStack = ({ stackData, onStackUpdate }) => {
    const [localStack, setLocalStack] = useState(stackData);
    const themeColors = useThemeStore((state) => state.colors);

    useEffect(() => {
        setLocalStack(stackData);
        console.log(localStack) // Ensure local state updates if stackData prop changes
    }, [stackData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedValue = value;

        if (name === "InitialIncrements") {
            updatedValue = value.split(',').map(num => parseInt(num.trim()));
        }

        const updatedStack = { ...localStack, [name]: updatedValue };
        setLocalStack(updatedStack);  // Update local state
        if (updatedStack) {
            onStackUpdate(updatedStack);  // Update in real-time to parent
        }
    };
    if (!localStack) {
        return (
            <Box
                margin = '1px 0'
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
                style={{ color: 'white' }} // Set the text color to white
            >
                <Box color="error.main">Please select a stack</Box>
            </Box>
        );
    }

    const inputLabelProps = {
        style: { color: 'white' }, // Set label text color to white
    };

    const textFieldStyle = {
        color: 'white', // Set input text color to white
        border: '1px solid white', // Set input border color to white
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2} style={{ color: 'white' }}>
            <Grid container spacing={2}
                  style={{ margin: '25px' }}  // Add your desired padding here
            >
                <Grid item xs={6}>
                    <TextField fullWidth label="Increment Value" name="IncrementValue" value={localStack.IncrementValue} onChange={handleChange} InputProps={{ style: textFieldStyle }} InputLabelProps={inputLabelProps} />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Equipment Stack Key" name="EquipmentStackKey" value={localStack.EquipmentStackKey} onChange={handleChange} InputProps={{ style: textFieldStyle }} InputLabelProps={inputLabelProps} />
                </Grid>

                {/* Second Column */}
                <Grid item xs={6}>
                    <TextField fullWidth label="Start Weight" name="StartWeight" value={localStack.StartWeight} onChange={handleChange} InputProps={{ style: textFieldStyle }} InputLabelProps={inputLabelProps} />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Increment Count" name="IncrementCount" value={localStack.IncrementCount} onChange={handleChange} InputProps={{ style: textFieldStyle }} InputLabelProps={inputLabelProps} />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                onClick={() => onStackUpdate(localStack)}
                style={{ margin: '25px', background:themeColors.primary }}  // Add your desired padding here
            >
                Update Stack
            </Button>        </Box>
    );
}
export default EditEquipmentStack;
