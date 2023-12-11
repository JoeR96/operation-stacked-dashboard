import React, { useState, useEffect } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, Box } from '@mui/material';
import Spinner from '../spinner/Spinner';
import {EquipmentStackApi} from "../../services/api";

const EquipmentStackTable = ({ selectedStack, setSelectedStack }) => {
    const equipmentStackApi = new EquipmentStackApi();

    const fetchEquipmentStack = async () => {
        try {
            console.log("boobs");
            const response = await equipmentStackApi.equipmentStackUserIdAllGet("894ce6d3-6990-454d-ba92-17a61d518d8c");
            console.log(response.data);

            return response.data;
        } catch (err) {
            console.error("Error fetching workouts:", error);
            throw error;
        }
    };

  const {
    data: equipmentStack,
    apiStatus,
    error,
    exec
  } = useApi(async () => await fetchEquipmentStack());

  useEffect(() => {
    exec();
  }, []);


  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error fetching equipment stack: {error?.message}</div>;

    console.log(equipmentStack)

  return (
    <Paper elevation={3} style={{ backgroundColor: "#242424" }}>
        <Table>
            <TableHead>
                <TableRow>
                    {['Id', 'Start Weight', 'Initial Increments', 'Increment Value', 'Increment Count', 'Edit'].map(header => (
                        <TableCell style={{ color: "white",fontWeight: 'bold' }} key={header}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {equipmentStack?.map((equipment) => (
                    <TableRow key={equipment.Id}>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.Id}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.StartWeight}</TableCell>
                        <TableCell style={{ color: "white", fontWeight: 'bold' }}>
                            {equipment.InitialIncrements ? equipment.InitialIncrements.join(', ') : '0'}
                        </TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.IncrementValue}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.IncrementCount}</TableCell>
                        <TableCell>
                            <Button variant="outlined" color="primary" onClick={() => setSelectedStack(equipment)}>
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
  );

}

export default EquipmentStackTable;
