import React from 'react'
import { Typography, Box, makeStyles, Grid, TextField, Button } from '@material-ui/core'
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../task/list"
import axios from 'axios';
import { useState } from "react";

const useStyle = makeStyles ({
    headingColor:{
        backgroundColor: deepPurple[400],
        color: "white"
    },
    addStuColor: {
        backgroundColor: green[400],
        color: 'White'
    },
})
const Home = () => {
    const  classes = useStyle();
    const [task, setTask] = useState({
        id: "",
        taskName: "",
        detail: ""
    });
    const [status, setStatus] = useState();

    function onTextFieldChange(e){
        // console.log('task');
        // console.log(e.target.name);
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
        // console.log(task);
    }

    async function onFormSubmit(e){
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3333/tasks`,task)
            setStatus(true);
        } catch (error) {
            console.log("Something is Wrong");
        }
    }
    if (status) {
        return <Home />
       }
    return (
        <>
            <Box textAlign={'center'} className={classes.headingColor} p={2} mb={2}>
                <Typography variant='h2'>
                    TODO CRUD 
                </Typography>
            </Box>
            <Grid container justifyContent="center" spacing={4}>
                <Grid item md={5} xs={12}>
                    <Box textAlign={"center"} p={2} className={classes.addStuColor} mb={2}>
                        <Typography variant='h4'>Add Task</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2} justifyContent="center">
                            {/* <Grid item xm={12} sm={6}>
                                <TextField autoComplete='id' name='id' variant='outlined' required fullWidth id='id' label='ID' autoFocus />
                            </Grid> */}
                            <Grid item xm={12} sm={12}>
                                <TextField autoComplete='taskName' name='taskName'
                                variant='outlined' required fullWidth id='taskname'
                                label="Task Name" onChange={ e => onTextFieldChange(e)} />
                            </Grid>
                            <Grid item xm={12} sm={12}>
                                <TextField autoComplete='detal' name='detail'
                                variant='outlined' required fullWidth id='detail'
                                label="Detail" onChange={e => onTextFieldChange(e)} />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type='submit' variant='contained' color='primary' fullWidth onClick={e => onFormSubmit(e)} >Add</Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item md={7} xs={12}>
                   <List />
                </Grid>
            </Grid>
        </>
    )
}

export default Home