// EquipmentStack.tsx

import React, { useEffect, useState } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Paper, Box, Typography } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';

const EquipmentStack = () => {
    const {
        data: equipmentData,
        apiStatus,
        error,
        exec
    } = useApi(() => fetchEquipmentStack("08dba69c-778a-457e-82f9-96554b76151d"));

    const [stack, setStack] = useState([]);

    useEffect(() => {
        if (equipmentData) {
            setStack(generateStack(equipmentData));
        }
    }, [equipmentData]);

    useEffect(() => {
        exec();
    }, []);

    const generateStack = (e) => {
        let stackArray = [];
        stackArray.push(e.StartWeight);

        for (let increment of (e.InitialIncrements || [])) {
            const t = stackArray[stackArray.length - 1];
            stackArray.push(t + increment);
        }

        for (let i = 0; i < e.IncrementCount; i++) {
            const t = stackArray[stackArray.length - 1];
            stackArray.push(t + e.IncrementValue);
        }

        return stackArray;
    };

    if (apiStatus === PENDING) return <div>Loading...</div>;
    if (apiStatus === ERROR) return <div>Error fetching equipment stack: {error?.message}</div>;

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            {stack.map((weight, index) => (
                <Box key={index} style={{
                    border: '1px solid black',
                    padding: '10px',
                    margin: '5px 0',
                    backgroundColor: weight % 2 === 0 ? 'lightgray' : 'white'
                }}>
                    <Typography variant="h6">
                        {weight} KG
                    </Typography>
                </Box>
            ))}
        </Paper>
    );
}

const fetchEquipmentStack = async (stackId) => {
    try {
        const response = await apiRequest(
            "GET",
            `/equipment-stack/${stackId}`,
            5002
        );
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error fetching equipment stack:", error);
        throw error;
    }
};

export default EquipmentStack;
