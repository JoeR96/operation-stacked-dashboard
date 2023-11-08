import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EditEquipmentStack = ({ stackData, onStackUpdate }) => {
    const [localStack, setLocalStack] = useState(stackData);

    useEffect(() => {
        setLocalStack(stackData);
        console.log(localStack)// Ensure local state updates if stackData prop changes
    }, [stackData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedValue = value;

        if (name === "InitialIncrements") {
            updatedValue = value.split(',').map(num => parseInt(num.trim()));
        }

        const updatedStack = { ...localStack, [name]: updatedValue };
        setLocalStack(updatedStack);  // Update local state
        if(updatedStack){
            onStackUpdate(updatedStack);  // Update in real-time to parent

        }
    };
    if (!localStack) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Box color="error.main">Please select a stack</Box>
            </Box>
        );
    }
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Id"
                    name="Id"
                    value={localStack.Id}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Start Weight"
                    name="StartWeight"
                    value={localStack.StartWeight}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Initial Increments (comma-separated)"
                    name="InitialIncrements"
                    value={localStack.InitialIncrements}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Increment Value"
                    name="IncrementValue"
                    value={localStack.IncrementValue}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Increment Count"
                    name="IncrementCount"
                    value={localStack.IncrementCount}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Equipment Stack Key"
                    name="EquipmentStackKey"
                    value={localStack.EquipmentStackKey}
                    onChange={handleChange}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="User ID"
                    name="UserID"
                    value={localStack.UserID}
                    onChange={handleChange}
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onStackUpdate(localStack)}>
                Update Stack
            </Button>
        </Box>
    );
    
}

export default EditEquipmentStack;
