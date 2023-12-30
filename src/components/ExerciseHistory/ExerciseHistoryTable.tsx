import React, { useState, useEffect } from 'react';
import { ExerciseHistoryApi, ExerciseHistoryDTO } from '../../services/api'; // Adjust the import path as needed
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Button,
    CircularProgress,
    Paper
} from '@mui/material';
import useThemeStore from '../../state/themeStore'; // Import the theme store

interface ExerciseHistoryTableProps {
    exerciseId: string;
}

const ExerciseHistoryTable: React.FC<ExerciseHistoryTableProps> = ({ exerciseId }) => {
    const [exerciseHistories, setExerciseHistories] = useState<ExerciseHistoryDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0); // Total number of rows for pagination
    const [deleting, setDeleting] = useState<Record<string, boolean>>({}); // New state for tracking deletion
    const themeColors = useThemeStore((state) => state.colors);

    const exerciseHistoryApi = new ExerciseHistoryApi(); // Moved outside of fetchExerciseHistory for reuse

    const fetchExerciseHistory = async () => {
        if (!exerciseId) return;

        setIsLoading(true);

        try {
            const response = await exerciseHistoryApi.exerciseHistoryPost(pageIndex, rowsPerPage, [exerciseId]);
            setExerciseHistories(response.data.Items as Array<ExerciseHistoryDTO>);
            setTotalRows(response.data.TotalCount as number);
        } catch (err) {
            console.error("Error fetching exercise history:", err);
            setError(`Error fetching exercise history: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteExerciseHistory = async (historyId: string) => {
        setDeleting(prev => ({ ...prev, [historyId]: true }));

        try {
            await exerciseHistoryApi.deleteExerciseIdPost(historyId);
            fetchExerciseHistory(); // Refresh the history after deletion
        } catch (error) {
            console.error("Error deleting exercise history:", error);
            setError(`Error deleting exercise history: ${error.message}`);
        } finally {
            setDeleting(prev => ({ ...prev, [historyId]: false }));
        }
    };

    useEffect(() => {
        fetchExerciseHistory();
    }, [exerciseId, pageIndex, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => setPageIndex(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageIndex(0);
    };

    if (!exerciseId) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="h6" style={{ color: themeColors.text }}>
                    Please select an exercise to view the history for.
                </Typography>
            </div>
        );
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!exerciseHistories.length) return <div>No exercise history found</div>;

    return (
        <div>
            <Typography variant="h5" align="center" style={{ fontWeight: 'bold', margin: '20px 0', color: themeColors.text }}>
                Exercise History
            </Typography>
            <TableContainer component={Paper} style={{ backgroundColor: themeColors.background }}>
                <Table aria-label="exercise history table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" style={{ color: themeColors.text }}>Date</TableCell>
                            <TableCell align="right" style={{ color: themeColors.text }}>Sets</TableCell>
                            <TableCell align="right" style={{ color: themeColors.text }}>Reps</TableCell>
                            <TableCell align="right" style={{ color: themeColors.text }}>Working Weight</TableCell>
                            <TableCell align="right" style={{ color: themeColors.text }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exerciseHistories.map((history) => (
                            <TableRow key={history.Id}>
                                <TableCell align="right" style={{ color: themeColors.text }}>
                                    {history.CompletedDate ? new Date(history.CompletedDate).toLocaleDateString('en-GB') : 'Invalid date'}
                                </TableCell>
                                <TableCell align="right" style={{ color: themeColors.text }}>{history.CompletedSets}</TableCell>
                                <TableCell align="right" style={{ color: themeColors.text }}>{history.CompletedReps}</TableCell>
                                <TableCell align="right" style={{ color: themeColors.text }}>{history.WorkingWeight} KG</TableCell>
                                <TableCell align="right" style={{ color: themeColors.text }}>
                                    {deleting[history.Id] ? <CircularProgress size={24} /> : (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => deleteExerciseHistory(history.Id)}
                                            disabled={deleting[history.Id]}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalRows}
                    page={pageIndex}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default ExerciseHistoryTable;
