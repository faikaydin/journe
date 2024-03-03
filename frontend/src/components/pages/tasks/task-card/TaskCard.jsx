import React, { useState, useContext } from "react";
import c from "./task-card.module.scss";
import Icon from "../../../../assets/Icon";
import EditableInput from "../../../utils/editable-input/EditableInput";
import TaskList from "../task-list/TaskList";
import TaskItem from "../task-item/TaskItem";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Data } from "../../../providers/DataProvider";
const TaskCard = ({ pot, tasks }) => {
  const [potTitle, setPotTitle] = useState(pot.pot_title);
  const [addTask, setAddTask] = useState(false);
  const { createObject, updateObject, deleteObject } = useContext(Data);

  // Create new task object
  const [newTask, setNewTask] = useState({
    task_description: "",
    task_start_time: dayjs(new Date()),
    task_duration: 10,
    task_id: "",
    task_title: "",
    task_pot_id: pot.pot_id,
  });

  // console.log(newTask);
  // Function to handle receiving the updated title from EditableInput
  const handleTitleUpdate = (newTitle) => {
    console.log(newTitle, pot.pot_id);
    setPotTitle(newTitle);
    if (pot.pot_id) {
      updateObject("pot", pot.pot_id, { ...pot, pot_title: newTitle });
    } else {
      createObject("pot", { ...pot, pot_title: newTitle, pot_id: uuidv4() });
    }
  };

  const createEmptyTaskHandler = () => {
    setAddTask(true);
  };

  const finishCreateTaskHandler = () => {
    console.log("show close");
    setAddTask(false);
  };

  const deletePotHandler = () => {
    deleteObject("pot", pot.pot_id);
  };

  return (
    <div key={pot.pot_id} className={c.cardContainer}>
      <div className={c.potTitleRow}>
        {pot.pot_title !== "task_platter" ? (
          <EditableInput
            input={potTitle}
            onInputUpdate={handleTitleUpdate}
            type="title"
          />
        ) : (
          <strong>{potTitle}</strong>
        )}
        <div className={c.buttonContainer}>
          {pot.pot_title !== "task_platter" ? (
            <button
              className={c.deleteButton}
              onClick={() => deletePotHandler(pot.pot_id)}
            >
              <Icon.Trash />
            </button>
          ) : null}
        </div>
      </div>
      <TaskList tasks={tasks} pot={pot} />
      <div className={c.addNewTask}>
        {addTask ? (
          <TaskItem task={newTask} potId={pot.pot_id} />
        ) : (
          <button onClick={createEmptyTaskHandler}>
            <Icon.Add size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
