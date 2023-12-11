import React, { useState } from 'react';
import { Box } from '@mui/material';
import EquipmentStack from "../../components/EquipmentStack/EquipmentStack";
import EditEquipmentStack from "../../components/EquipmentStack/EditEquipmentStack";
import EquipmentStackTable from "../../components/EquipmentStack/EquipmentStackTable";

const EquipmentStackPage = () => {
    const [selectedStack, setSelectedStack] = useState(null);

    return (
        <Box display="flex" width="100%" height="100%">
            {/* Left Side - EquipmentStack */}
            <Box width="50%" height="100%">
                <EquipmentStack stackData={selectedStack} />
            </Box>

            {/* Right Side - Divided into two equal parts */}
            <Box width="50%" height="100%" display="flex" flexDirection="column">
                {/* Top Right - EditEquipmentStack */}
                <Box flexGrow={1}>
                    <EditEquipmentStack
                        stackData={selectedStack}
                        onStackUpdate={setSelectedStack}
                    />
                </Box>

                {/* Bottom Right - EquipmentStackTable */}
                <Box flexGrow={1}>
                    <EquipmentStackTable
                        selectedStack={selectedStack}
                        setSelectedStack={setSelectedStack}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default EquipmentStackPage;
