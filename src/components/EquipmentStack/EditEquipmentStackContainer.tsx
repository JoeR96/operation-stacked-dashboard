import React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStack from './EditEquipmentStack';

const EditEquipmentStackContainer = ({ stackData, onStackUpdate }) => {
    console.log('init stack', stackData)
    const [localStack, setLocalStack] = useState(stackData);

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

    const handleStackUpdate = (updatedStack) => {
        // You can do something with the updated stack here.
        // For now, just updating the local state.
        setLocalStack(updatedStack);

        // Call the onStackUpdate prop to notify parent components or save to a database
        if (onStackUpdate) {
            onStackUpdate(updatedStack);
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
                <EditEquipmentStack
                    stackData={localStack}
                    onStackUpdate={handleStackUpdate}
                />
            </Box>
        </Box>
    );
}

export default EditEquipmentStackContainer;
