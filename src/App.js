import {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {TextField, Button, Grid} from "@mui/material";
import styled from "@emotion/styled";
import TaskItem from "./components/TaskItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
 
  const [taskName, setTaskName] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("https://todocraft.ddev.site/tasks.json");
    const tasks = await response.json();
    console.log(tasks);

    if (tasks?.data) {
      setTasks(tasks.data);
    }
  }

  useEffect (() => {
    fetchTasks();
  }, [])
  

  const valueChange = (event) => {
    const newValue = event.target.value;
    setTaskName(newValue);
  }

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift({
      id: uuidv4(),
      name: task,
    });

    setTasks(newTasks);
    setTaskName("");
  }




  return (
    <div className="App">
      <div id="todo-app">
        <form>
          <StyledGrid container justifyContent={"center"}>
            <Grid item>
              <TextField 
                size="small"
                type="text" 
                id="new-task" 
                placeholder="Enter a new task" 
                value={taskName} 
                onChange={valueChange}/>
            </Grid>
              <Grid item>
                <StyledButton 
                  size="large"
                  id="add-task" 
                  variant="outlined" 
                  onClick={((e) => handleAddTask(e, taskName))}
                >Create Task</StyledButton>
              </Grid>
            </StyledGrid>
            <ul id="task-list">
              {tasks.map((task, index) => {
                return (
                  <TaskItem key={`task-${task.id}-${index}`} task={task} tasks={tasks} setTasks={setTasks} index={index} />
                )
              })}
            </ul>
          </form>
      </div>
    </div>
  );

  }

export default App;

const StyledButton = styled(Button)`
  border-color: green;
`

const StyledGrid = styled(Grid)`
  border-color: green;
`
