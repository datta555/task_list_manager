import { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import deleteTaskImage from "../images/iconsDelete.svg";
import "./Task.scss";

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const setTask = useCallback(
    (task) => {
      setTasks([...tasks, task]);
    },
    [tasks, setTasks]
  );

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((singleTask) => singleTask.id !== taskId));
    },
    [tasks, setTasks]
  );

  // function to mark the task as complete OR revert it
  const markTask = useCallback(
    (taskId) => {
      let newTaskList = [...tasks];
      newTaskList.forEach((taskToCheck) => {
        if (taskToCheck.id === taskId) {
          taskToCheck.isCompleted = !taskToCheck.isCompleted;
        }
      });
      setTasks(newTaskList);
    },
    [tasks]
  );

  return (
    <div className="taskManager">
      <AddTask addTask={setTask} newId={tasks.length} />
      <div className="tasksAlignCenter">
        {tasks?.length ? (
          tasks?.map((task) => {
            return (
              <Task {...task} deleteTask={deleteTask} markTask={markTask} />
            );
          })
        ) : (
          <div> No tasks Added </div>
        )}
      </div>
    </div>
  );
};

const AddTask = (props) => {
  const [task, setTaskName] = useState("");

  return (
    <div className="addTask">
      <TextField
        id="standard-basic"
        label="Task Name"
        value={task}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.addTask({
            taskName: task,
            isCompleted: false,
            id: props.newId,
          });
          setTaskName("");
        }}
        disabled={!task.length}
      >
        Add Task
      </Button>
    </div>
  );
};

const Task = (props) => {
  return (
    <div>
      <Checkbox
        checked={props?.isCompleted}
        onChange={() => props.markTask(props.id)}
      />
      <span>{props?.taskName}</span>
      <img
        src={deleteTaskImage}
        alt="deleteTask"
        onClick={() => props.deleteTask(props.id)}
        className="deleteTask paddingFromLeft"
      />
    </div>
  );
};
