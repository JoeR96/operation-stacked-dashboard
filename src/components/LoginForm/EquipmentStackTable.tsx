import React, { useEffect } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';

const EquipmentStackTable = () => {
  // Default values
  const defaultUserId = "08dba696-0efb-43d1-869f-4a32c72da3d3";
  const defaultWeek = 1;
  const defaultDay = 1;
  const defaultCompleted = true;

  const {
    data: equipmentStack,
    apiStatus,
    error,
    exec
  } = useApi(() => fetchEquipmentStack(defaultUserId, defaultWeek, defaultDay, defaultCompleted));

  useEffect(() => {
    exec();
  }, []);

  if (apiStatus === PENDING) return <div>Loading...</div>;
  if (apiStatus === ERROR) return <div>Error fetching equipment stack: {error?.message}</div>;

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipmentStack && (
            <>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{equipmentStack.Id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Start Weight</TableCell>
                <TableCell>{equipmentStack.StartWeight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Initial Increments</TableCell>
                <TableCell>{JSON.stringify(equipmentStack.InitialIncrements)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Increment Value</TableCell>
                <TableCell>{equipmentStack.IncrementValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Increment Count</TableCell>
                <TableCell>{equipmentStack.IncrementCount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Equipment Stack Key</TableCell>
                <TableCell>{equipmentStack.EquipmentStackKey}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>{equipmentStack.UserID}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

const fetchEquipmentStack = async (userId: string, week: number, day: number, completed: boolean) => {
  try {
    const response = await apiRequest(
      "GET",
      `/equipment-stack/${userId}/all`,
      5002
    );
    return response;
  } catch (error) {
    console.error("Error fetching equipment stack:", error);
    throw error;
  }
};

export default EquipmentStackTable;
