import React from "react";
import { Typography, Box, makeStyles,TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const useStyle = makeStyles ({
    stuListColor: {
        backgroundColor:orange[400],
        color: 'White'
    },
    tableHeadCell: {
        color: 'White',
        fontWeight: 'bold',
        fontSize: 16
    }
});

const View = () => {
    const  classes = useStyle();
    const { id } = useParams();
    const [task, setTask] = useState([]);
    const history = useHistory();   
    useEffect(() => {
        async function getTask() {
        try {
            const task = await axios.get(`http://localhost:3333/tasks/${id}`)
            // console.log(tasks.data,"uysatdfvbiyugcf");
            setTask(task.data);
        } catch (error) {
            console.log("Something is Wrong");
        }
    }
        getTask();
    }, [id]);
    
    function handleClick() {
        history.push("/")
    }
    // console.log(id);
    return (
        <>
            <Box textAlign={"center"} p={2} className={classes.stuListColor}>
                <Typography variant="h4">Task Detail</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161"}}>
                            <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Task Name</TableCell>
                            <TableCell align="center" className={classes.tableHeadCell}>Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell align="center">{task.id}</TableCell>
                        <TableCell align="center">{task.taskName}</TableCell>
                        <TableCell align="center">{task.detail}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={3} textAlign={"center"}>
                <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
            </Box>
        </>
    )
}

export default View