import React, { useState, useEffect } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, Box } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStackContainer from './EditEquipmentStackContainer';
import Spinner from '../spinner/Spinner';

const EquipmentStackTable = ({ selectedStack, setSelectedStack }) => {


  const {
    data: equipmentStack,
    apiStatus,
    error,
    exec
  } = useApi(fetchEquipmentStack);

  useEffect(() => {
    exec();
  }, []);


  if (apiStatus === PENDING) return <Spinner />;
  if (apiStatus === ERROR) return <div>Error fetching equipment stack: {error?.message}</div>;

  return (
    <Paper elevation={3} style={{ backgroundColor: "#242424" }}>
        <Table>
            <TableHead>
                <TableRow>
                    {['Id', 'Start Weight', 'Initial Increments', 'Increment Value', 'Increment Count', 'Equipment Stack Key', 'User ID', 'Edit'].map(header => (
                        <TableCell style={{ color: "white",fontWeight: 'bold' }} key={header}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {equipmentStack?.map((equipment) => (
                    <TableRow key={equipment.Id}>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.Id}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.StartWeight}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.InitialIncrements?.join(', ') || '0'}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.IncrementValue}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.IncrementCount}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.EquipmentStackKey}</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>{equipment.UserID}</TableCell>
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

const fetchEquipmentStack = async () => {
  const defaultUserId = "894ce6d3-6990-454d-ba92-17a61d518d8c";
  const defaultWeek = 1;
  const defaultDay = 1;
  const defaultCompleted = true;

  try {
    const response = await apiRequest(
      "GET",
      `/equipment-stack/${defaultUserId}/all`,
      5002
    );
    return response;
  } catch (error) {
    console.error("Error fetching equipment stack:", error);
    throw error;
  }
};

export default EquipmentStackTable;
