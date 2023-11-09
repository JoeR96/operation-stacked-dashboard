import React, {useState} from 'react'
import EquipmentStackTable from "../../components/EquipmentStack/EquipmentStackTable.tsx";
import EditEquipmentStack from "../../components/EquipmentStack/EditEquipmentStack";
import EditEquipmentStackContainer from "../../components/EquipmentStack/EditEquipmentStackContainer";
import {Box} from "@mui/material";

const EquipmentStackPage = () => {
    const [selectedStack, setSelectedStack] = useState(null);

    return (
        <Box>
            <EditEquipmentStackContainer stackData={selectedStack}/>
            <EquipmentStackTable
                selectedStack={selectedStack}   // Pass down as props
                setSelectedStack={setSelectedStack}  // Pass down setter as props
            />
        </Box>
    )
}

export default EquipmentStackPage
