import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const EditEquipmentStack = ({ stackData, onStackUpdate }) => {

    const [localStack, setLocalStack] = useState(stackData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalStack(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        onStackUpdate(localStack);
    };

    return (
        <Box>
            <TextField
                label="Start Weight"
                name="StartWeight"
                value={localStack.StartWeight}
                onChange={handleChange}
            />
            {/* Similarly for other fields ... */}

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Update Stack
            </Button>
        </Box>
    );
}

export default EditEquipmentStack;
