import React, {useState} from 'react'
import EquipmentStackTable from "../../components/EquipmentStack/EquipmentStackTable.tsx";

const EquipmentStackPage = () => {
    const [selectedStack, setSelectedStack] = useState(null);

    return (
        <EquipmentStackTable
            selectedStack={selectedStack}   // Pass down as props
            setSelectedStack={setSelectedStack}  // Pass down setter as props
        />
    )
}

export default EquipmentStackPage