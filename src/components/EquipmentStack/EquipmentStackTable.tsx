import React, { useState, useEffect } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';
import EquipmentStack from './EquipmentStack';
import EditEquipmentStackContainer from './EditEquipmentStackContainer';

const EquipmentStackTable = () => {

  const [selectedStack, setSelectedStack] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    data: equipmentStack,
    apiStatus,
    error,
    exec
  } = useApi(fetchEquipmentStack);

  useEffect(() => {
    exec();
  }, []);
  useEffect(() => {
    console.log(selectedStack)
    if (selectedStack) {
      setOpen(true);
    }
  }, [selectedStack]);

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
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipmentStack?.map((equipment) => (
            <TableRow key={equipment.Id}>
              <TableCell>{equipment.Id}</TableCell>
              <TableCell>{equipment.StartWeight}</TableCell>
              <TableCell>{equipment.InitialIncrements?.join(', ') || '0'}</TableCell>
              <TableCell>{equipment.IncrementValue}</TableCell>
              <TableCell>{equipment.IncrementCount}</TableCell>
              <TableCell>{equipment.EquipmentStackKey}</TableCell>
              <TableCell>{equipment.UserID}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    console.log("equipment object:", equipment);
                    setSelectedStack(equipment);
                  }}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {console.log("selectedStack value:", selectedStack)}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        {selectedStack && <EditEquipmentStackContainer stackData={selectedStack} />}
      </Dialog>
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
