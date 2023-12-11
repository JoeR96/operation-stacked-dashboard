// EquipmentStack.tsx

import React, { useEffect, useState } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Paper, Box, Typography } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';

const EquipmentStack = ({ stackData }) => {
    const [stack, setStack] = useState([]);

    useEffect(() => {
        console.log(stackData)
        if (stackData) {
            setStack(generateStack(stackData));
        }
    }, [stackData]);



    const generateStack = (e) => {
        console.log(stack)
        let stackArray = [Number(e.StartWeight)];

        for (let increment of (e.InitialIncrements || [])) {
            const t = Number(stackArray[stackArray.length - 1]);
            stackArray.push(t + Number(increment));
        }

        for (let i = 0; i < e.IncrementCount; i++) {
            const t = Number(stackArray[stackArray.length - 1]);
            stackArray.push(t + Number(e.IncrementValue));
        }

        return stackArray;
    };



    return (
        <Paper elevation={3} style={{ margin: '50px', backgroundColor: '#1d1d1d' }}>
            {stack.map((weight, index) => (
                <Box
                    key={index}
                    style={{
                        margin: '1px 0',
                        backgroundColor: index % 2 === 0 ? '#5c5c5c' : '#6d6d6d',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid #8c8c8c',
                        borderRadius: '5px',

                    }}
                >
                    <Typography variant="h7" style={{ fontWeight: 'bold',color:'white' }}>
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
