import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import EquipmentStack from "../../components/EquipmentStack/EquipmentStack";
import EditEquipmentStack from "../../components/EquipmentStack/EditEquipmentStack";
import EquipmentStackTable from "../../components/EquipmentStack/EquipmentStackTable";
import EquipmentStackForm from './EquipmentStackForm';

const EquipmentStackPage = () => {
    const [selectedStack, setSelectedStack] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <Box width="100%" height="100%">
            {/* Create Button */}
            <Box mb={2}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Create Equipment Stack
                </Button>
            </Box>

            {/* Modal for EquipmentStackForm */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="create-equipment-stack-modal"
                aria-describedby="create-equipment-stack-form"
            >
                <Box 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600, // Adjust as needed
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflow: 'auto',
                        maxHeight: '90%',
                    }}
                >
                    <Typography id="create-equipment-stack-modal" variant="h6" component="h2">
                        Create Equipment Stack
                    </Typography>
                    <EquipmentStackForm />
                </Box>
            </Modal>

            {/* Main Content */}
            {selectedStack ? (
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
            ) : (
                // Full-width EquipmentStackTable when no stack is selected
                <Box width="100%" height="100%">
                    <EquipmentStackTable
                        selectedStack={selectedStack}
                        setSelectedStack={setSelectedStack}
                    />
                </Box>
            )}
        </Box>
    );
}

export default EquipmentStackPage;
