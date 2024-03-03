import React, { useState, useContext, useEffect } from "react";
import c from "./task-item.module.scss";
import EditableInput from "../../../utils/editable-input/EditableInput";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Data } from "../../../providers/DataProvider";
import { Checkbox } from "antd";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Icon from "../../../../assets/Icon";

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

  const [tempId, setTempId] = useState();
  useEffect(() => {
    if (!currentTask.task_id) {
      setTempId(uuidv4());
    }
  }, [task]);

  // Function to handle receiving the updated title from EditableInput
  const handleTitleUpdate = (newText) => {
    setCurrentTask((prevTask) => ({
      ...prevTask,
      task_title: newText,
    }));

    if (currentTask.task_id) {
      updateObject("task", currentTask.task_id, {
        ...currentTask,
        task_title: newText,
      });
    } else {
      createObject("task", {
        ...currentTask,
        task_pot_id: potId,
        task_id: tempId,
      });
    }
  };

  const handleDurationUpdate = (duration) => {
    setCurrentTask((prevTask) => ({
      ...prevTask,
      task_duration: duration,
    }));
    updateObject("task", currentTask.task_id, {
      ...currentTask,
      task_duration: duration,
    });
  };

  const handleDateChange = (date) => {
    console.log(date, format(new Date(date), "yyyy-MM-dd HH:mm:ss"));
    // setSelectedDate(date);
    setCurrentTask((prevTask) => ({
      ...prevTask,
      task_start_time: date,
    }));
    updateObject("task", currentTask.task_id, {
      ...currentTask,
      task_start_time: format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
    });
  };

  const datePickerStyle = {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    fontSize: "1rem",
  };

  const checkboxHandler = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  //Delete task
  const handleDeleteTask = () => {
    deleteObject("task", task.task_id);
  };

  return (
    <div className={c.taskItem}>
      <div className={c.taskContainer}>
        <Checkbox onChange={checkboxHandler}> </Checkbox>
        <div className={c.task}>
          <EditableInput
            input={currentTask.task_title}
            onInputUpdate={handleTitleUpdate}
            type="text"
          />
          <span className={c.nonEditable}>for</span>
          <EditableInput
            input={task.task_duration}
            onInputUpdate={handleDurationUpdate}
            type="number"
          />
          <span>mins</span>
          <span className={c.nonEditable}> start at</span>

          <span>
            <DatePicker
              showTime // To show time picker as well
              format={"HH:mm DD-MM"}
              value={dayjs(new Date(currentTask.task_start_time))}
              onChange={handleDateChange}
              style={datePickerStyle}
            />
          </span>
        </div>
        <button className={c.deleteButton} onClick={handleDeleteTask}>
          <Icon.Trash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
