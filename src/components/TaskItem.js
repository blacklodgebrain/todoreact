import { IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/DoDisturb";
import SaveIcon  from "@mui/icons-material/Save";
import styled from "@emotion/styled";


const TaskItem = (props) => {
    const {task, tasks, setTasks, index} = props;
    const [taskName, setTaskName] = useState(task.name);
    const [editState, setEditState] = useState(false);

    const updateTask = async () => {
        const response = await fetch(`https://todocraft.ddev.site/task/${task.id}.json`, {method: "POST"});
        const tasks = await response.json();
        console.log(tasks);
    
        // if (tasks?.data) {
        //   setTasks(tasks.data);
        // }

    const deleteItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];

        newTasks.splice(index, 1);

        setTasks(newTasks);
    }

    const saveItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        const newTask = {...newTasks[index]};

        newTask.name = taskName;
        newTasks[index] = newTask;

        setTasks(newTasks);
        setEditState(false);
    }

    const editItem = (e) => {
        e.preventDefault();
        setEditState(true);
    }

    const cancelItem = (e) => {
        e.preventDefault();
        setTaskName(task.name);
        setEditState(false);
    }

    const handTaskNameOnChange = (e) => {
        const newTask = e.target.value;
        setTaskName(newTask);
    }

    if (!task) {
        return null;
    }

    return (
        <li>

            {editState ? (
                <>
                <EditTaskName type="text" value={taskName} onChange={(e) => {handTaskNameOnChange(e)}} />
                    <IconButton onClick={(e) => cancelItem(e)}>
                        <CancelIcon color="error" />
                    </IconButton>

                    <IconButton onClick={(e) => saveItem(e)}>
                        <SaveIcon color="success" />
                    </IconButton>
                </>
            ) : (
                <>
                    <TaskName>{task.name}</TaskName>
                    <IconButton onClick={(e) => deleteItem(e)}>
                        <DeleteForever color="error" />
                    </IconButton>

                    <IconButton onClick={(e) => editItem(e)}>
                        <EditIcon color="success" />
                    </IconButton>
                </>
            )}
        </li>
    );
}

export default TaskItem;

const TaskName = styled.div`
    font-size: 14px;
`

const EditTaskName = styled.input`
    font-size: 14px;
`