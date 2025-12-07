import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const history = useHistory();
 const [task, setTask] = useState({
  taskName: "",
  detail: ""
 });
 useEffect(() => {
  async function gettask() {
   try {
    const task = await axios.get(`http://localhost:3333/tasks/${id}`)
    // console.log(task.data);
    setTask(task.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  gettask();
 }, [id]);

 function onTextFieldChange(e) {
  setTask({
   ...task,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`http://localhost:3333/tasks/${id}`, task)
   history.push("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 function handleClick() {
  history.push("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
    <Typography variant="h2">React CRUD with API Call</Typography>
   </Box>

   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Edit task</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="taskname" name="taskName" variant="outlined" required fullWidth id="taskName" label="Task Name" value={task.taskName} onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="detail" name="detail" variant="outlined" required fullWidth id="detail" label="Detail" value={task.detail} onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid >
  </>
 )
}

export default Edit