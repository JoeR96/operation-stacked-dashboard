// EquipmentStackComponent.tsx

import { useEffect } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';

const EquipmentStackTable = () => {
  // Assuming no default values for fetching an EquipmentStack
  
  const defaultUserId = "08dba696-0efb-43d1-869f-4a32c72da3d3";
  const defaultWeek = 1;
  const defaultDay = 1;
  const defaultCompleted = true;
  const {
    data: equipmentStack,
    apiStatus,
    error,
    exec
  } = useApi(fetchEquipmentStack);

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
            <TableCell>Id</TableCell>
            <TableCell>Start Weight</TableCell>
            <TableCell>Initial Increments</TableCell>
            <TableCell>Increment Value</TableCell>
            <TableCell>Increment Count</TableCell>
            <TableCell>Equipment Stack Key</TableCell>
            <TableCell>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipmentStack?.map((equipment) => (
            <TableRow key={equipment.Id}>
              <TableCell>{equipment.Id}</TableCell>
              <TableCell>{equipment.StartWeight}</TableCell>
              <TableCell>{equipment.InitialIncrements && equipment.InitialIncrements.length > 0 ? equipment.InitialIncrements.join(', ') : '0'}</TableCell>
              <TableCell>{equipment.IncrementValue}</TableCell>
              <TableCell>{equipment.IncrementCount}</TableCell>
              <TableCell>{equipment.EquipmentStackKey}</TableCell>
              <TableCell>{equipment.UserID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const fetchEquipmentStack = async () => {
  try {
    const defaultUserId = "894ce6d3-6990-454d-ba92-17a61d518d8c";
    const defaultWeek = 1;
    const defaultDay = 1;
    const defaultCompleted = true;

    const response = await apiRequest(
      "GET",
      `/equipment-stack/${defaultUserId}/all`,
      5002
    );
    return response;
  } catch (error) {
    console.error("Error fetching equipment stack:", error);
    throw error;  // Re-throwing the error for useApi hook to catch it.
  }
};

export default EquipmentStackTable;
