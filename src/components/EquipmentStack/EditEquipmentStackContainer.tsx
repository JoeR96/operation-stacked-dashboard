import React, { useState } from 'react';
import { Box } from '@mui/material';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStack from './EditEquipmentStack';

const EditEquipmentStackContainer = ({ stackData, onStackUpdate }) => {
    const handleStackUpdate = (updatedStack) => {
        // Notify parent components or save to a database
        setUpdatedStackData(updatedStack);

        if (onStackUpdate) {
            onStackUpdate(updatedStack);
        }
    };
    const [updatedStackData, setUpdatedStackData] = useState(stackData);

    return (
        <Box display="flex" height="100vh"> {/* Assuming you want it to take the full viewport height */}
            <Box width="50%" height="100%" overflowY="auto">
                <EquipmentStack stackData={stackData} />
            </Box>
            <Box
                width="50%"
                height="100vh"
                p={2}
                position="fixed"
                right={0}
                top={0}
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <EditEquipmentStack
                    stackData={stackData}
                    onStackUpdate={handleStackUpdate}
                />
            </Box>
        </Box>
    );
}

export default EditEquipmentStackContainer;
