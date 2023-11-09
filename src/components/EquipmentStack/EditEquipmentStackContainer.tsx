import React, { useState } from 'react';
import { Box } from '@mui/material';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStack from './EditEquipmentStack';

const EditEquipmentStackContainer = ({ stackData }) => {
    const [updatedStackData, setUpdatedStackData] = useState(stackData);

    const handleStackUpdate = (updatedStack) => {
        // Notify parent components or save to a database
        setUpdatedStackData(updatedStack);
    };

    console.log("stackDataRendercheck",stackData)
    if (stackData) {
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
    } else {
        return <div>No stack data available.</div>;
    }
}

export default EditEquipmentStackContainer;
