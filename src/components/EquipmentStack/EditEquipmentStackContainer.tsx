import React, { useState } from 'react';
import { Box } from '@mui/material';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStack from './EditEquipmentStack';

const EditEquipmentStackContainer = ({ stackData }) => {
    const [, setUpdatedStackData] = useState(stackData);

    const handleStackUpdate = (updatedStack) => {
        setUpdatedStackData(updatedStack);
    };

    console.log("stackDataRendercheck",stackData)
    if (stackData) {
        return (
            <Box display="flex" style={{ width: '100%', height: '100%' }}>
                <Box width="50%" display="flex" flexDirection="column">
                    <Box flexGrow={1} >
                        <EquipmentStack stackData={stackData} />
                    </Box>
                </Box>
                <Box width="50%" display="flex" flexDirection="column">
                    <Box flexGrow={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <EditEquipmentStack
                            stackData={stackData}
                            onStackUpdate={handleStackUpdate}
                        />
                    </Box>
                </Box>
            </Box>

        );
    } else {
        return <div>No stack data available.</div>;
    }
}

export default EditEquipmentStackContainer;
