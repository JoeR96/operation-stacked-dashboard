import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import EquipmentStack from './EquipmentStack';

const EditEquipmentStackContainer = ({ initialStackData, onStackUpdate }) => {

    const [localStack, setLocalStack] = useState(initialStackData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "InitialIncrements") {
            setLocalStack(prevState => ({
                ...prevState,
                [name]: value.split(',').map(num => parseInt(num.trim()))
            }));
        } else {
            setLocalStack(prevState => ({ ...prevState, [name]: value }));
        }
    };

    return (
        <Box display="flex">
            {/* EquipmentStack on the left */}
            <Box flex="1">
                <EquipmentStack stackData={localStack} />
            </Box>

            {/* Edit fields on the right */}
            <Box flex="1" p={2}>
                <TextField
                    label="Id"
                    name="Id"
                    value={localStack.Id}
                    onChange={handleChange}
                />
                <TextField
                    label="Start Weight"
                    name="StartWeight"
                    value={localStack.StartWeight}
                    onChange={handleChange}
                />
                <TextField
                    label="Initial Increments (comma-separated)"
                    name="InitialIncrements"
                    value={localStack.InitialIncrements.join(', ')}
                    onChange={handleChange}
                />
                <TextField
                    label="Increment Value"
                    name="IncrementValue"
                    value={localStack.IncrementValue}
                    onChange={handleChange}
                />
                <TextField
                    label="Increment Count"
                    name="IncrementCount"
                    value={localStack.IncrementCount}
                    onChange={handleChange}
                />
                <TextField
                    label="Equipment Stack Key"
                    name="EquipmentStackKey"
                    value={localStack.EquipmentStackKey}
                    onChange={handleChange}
                />
                <TextField
                    label="User ID"
                    name="UserID"
                    value={localStack.UserID}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onStackUpdate(localStack)}>
                    Update Stack
                </Button>
            </Box>
        </Box>
    );
}

export default EditEquipmentStackContainer;
