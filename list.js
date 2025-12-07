import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip, Checkbox } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    taskListColor: {
        backgroundColor: orange[400],
        color: 'White'
    },
    tableHeadCell: {
        color: 'White',
        fontWeight: 'bold',
        fontSize: 16
    },
    completedTask: {
        textDecoration: 'line-through'
    },
    scrollableTable: {
        maxWidth: '360px',
        overflowX: 'auto'
    }
});

const List = () => {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getAllTasks() {
            try {
                const response = await axios.get("http://localhost:3333/tasks");
                setTasks(response.data);
            } catch (error) {
                console.log("Error fetching tasks:", error);
            }
        }
        getAllTasks();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3333/tasks/${id}`);
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const handleToggleStatus = async (id,taskName,taskDetail, currentStatus) => {
        try {
            const updatedTask = await axios.put(`http://localhost:3333/tasks/${id}`, {
                id:id,
                taskName:taskName,
                detail:taskDetail,
                status: !currentStatus  // Toggle the status
            });
            const updatedTasks = tasks.map((task) =>
                task.id === id ? updatedTask.data : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.log("Error updating task status:", error);
        }
    };

    return (
        <>
            <Box textAlign="center" p={2} className={classes.taskListColor}>
                <Typography variant='h4'>TODO List</Typography>
            </Box>
            
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align='center' className={classes.tableHeadCell}>No</TableCell>
                            <TableCell align='center' className={classes.tableHeadCell}>Task Name</TableCell>
                            <TableCell align='center' className={classes.tableHeadCell}>Detail</TableCell>
                            <TableCell align='center' className={classes.tableHeadCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.scrollableTable}>
                        {tasks.map((task, index) => (
                            <TableRow key={task.id}>
                                <TableCell align='center'>{index + 1}</TableCell>
                                <TableCell align='center' className={task.status ? classes.completedTask : ''}>{task.taskName}</TableCell>
                                <TableCell align='center' className={task.status ? classes.completedTask : ''}>{task.detail}</TableCell>
                                <TableCell align='center'>
                                    <Tooltip title='View'>
                                        <IconButton><Link to={`/view/${task.id}`}><VisibilityIcon color='primary' /></Link></IconButton>
                                    </Tooltip>
                                    <Tooltip title='Edit'>
                                        <IconButton><Link to={`/edit/${task.id}`}><EditIcon /></Link></IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete'>
                                        <IconButton onClick={() => handleDelete(task.id)}><DeleteIcon color='secondary' /></IconButton>
                                    </Tooltip>
                                    <Tooltip title={task.status ? 'Mark as Incomplete' : 'Mark as Complete'}>
                                        <Checkbox
                                            icon={<CheckCircleIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            checked={task.status}
                                            onChange={() => handleToggleStatus(task.id,task.taskName,task.detail, task.status)}
                                        />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default List;
