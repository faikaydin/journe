import React, { useState, useContext } from "react";
import c from "./task-item.module.scss";
import Icon from "../../../../../assets/Icon";
import EditableInput from "../../../../utils/editable-input/EditableInput";
import { format } from "date-fns";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Data } from "../../../../providers/DataProvider";

const TaskItem = ({ task, potId }) => {
  const [currentTask, setCurrentTask] = useState({
    task_description: task.task_description,
    task_start_time: task.task_start_time,
    task_duration: task.task_duration,
    task_id: task.task_id,
    task_title: task.task_title,
    task_pot_id: potId,
  });
  //Update task
  const { createObject, updateObject, deleteObject } = useContext(Data);
  const handleUpdateTask = (task) => {};

  // const [taskTitle, setTaskTitle] = useState(task.task_title);
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date(task.task_start_time))
  ); // State to store selected date

  // Function to handle receiving the updated title from EditableInput
  const handleTitleUpdate = (newText) => {
    // setTaskTitle(newText);
    setCurrentTask((prevTask) => ({
      ...prevTask,
      task_title: newText,
    }));
    console.log(newText);
    updateObject("task", currentTask.task_id, {
      ...currentTask,
      task_title: newText,
    });
  };

  const handleDurationUpdate = (duration) => {};

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const datePickerStyle = {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    fontSize: "1rem",
  };
  return (
    <div className={c.taskItem}>
      <div className={c.taskContainer}>
        <input type="checkbox" id={task.task_title} name={task.task_title} />
        {/* <label htmlFor={task.task_title}>{task.task_title}</label> */}

        <input type="checkbox" id={task.task_title} className={c.checkbox} />
        <div className={c.task}>
          <EditableInput
            input={currentTask.task_title}
            onInputUpdate={handleTitleUpdate}
            type="text"
          />
          <span className={c.nonEditable}>for</span>
          <EditableInput
            input={task.task_duration}
            onInputUpdate={handleTitleUpdate}
            type="text"
          />
          <span>mins</span>
          <span className={c.nonEditable}> start at</span>

          <span>
            {/* {format(new Date(task.task_start_time), "k:m  MMM dd")} */}

            <DatePicker
              showTime // To show time picker as well
              value={selectedDate}
              onChange={handleDateChange}
              style={datePickerStyle}
            />
          </span>
        </div>
      </div>
      {/* <div className={c.buttonContainer}>
        <button
          className={c.deleteButton}
          onClick={() => updateTaskHandler(task)}
        >
          <Icon.Pencil />
        </button>
        <button
          className={c.deleteButton}
          onClick={() => deleteTaskHandler(task.task_id)}
        >
          <Icon.Trash />
        </button>
      </div> */}
    </div>
  );
};

export default TaskItem;
