import React, { useState } from 'react';
import { Box } from '@mui/material';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStack from './EditEquipmentStack';

const EditEquipmentStackContainer = ({ stackData, onStackUpdate }) => {
    const [updatedStackData, setUpdatedStackData] = useState(stackData);

    const handleStackUpdate = (updatedStack) => {
        // Notify parent components or save to a database
        setUpdatedStackData(updatedStack);

        if (onStackUpdate) {
            onStackUpdate(updatedStack);
        }
    };

    return (
        <Box display="flex">
            <Box width="50%">
                <EquipmentStack stackData={stackData} />
            </Box>
            <Box width="50%">
                <EditEquipmentStack
                    stackData={stackData}
                    onStackUpdate={handleStackUpdate}
                />
            </Box>
        </Box>
    );
}

export default EditEquipmentStackContainer;
