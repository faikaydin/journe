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
import { stringToBoolean } from "./utils";

const TaskItem = ({ task, potId, handleFinishInput }) => {
  const [currentTask, setCurrentTask] = useState({
    task_description: task.task_description,
    task_start_time: task.task_start_time,
    task_duration: task.task_duration,
    task_id: task.task_id,
    task_title: task.task_title,
    task_is_complete: stringToBoolean(task?.task_is_complete),
    task_pot_id: potId,
  });

  // Make sure task display is up to date
  useEffect(() => {
    setCurrentTask({
      ...task,
      task_is_complete: stringToBoolean(task?.task_is_complete),
    });
  }, [task]);

  //Update task
  const { setTasks, createObject, updateObject, deleteObject } =
    useContext(Data);

  const [tempId, setTempId] = useState();
  useEffect(() => {
    if (!currentTask?.task_id) {
      setTempId(uuidv4());
    }
  }, [task]);

  // Function to handle receiving the updated title from EditableInput
  const handleTitleUpdate = (newText) => {
    setCurrentTask(() => ({
      ...task,
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
      handleFinishInput();
    }
  };

  const handleDurationUpdate = (duration) => {
    setCurrentTask(() => ({
      ...task,
      task_duration: duration,
    }));
    updateObject("task", currentTask.task_id, {
      ...currentTask,
      task_duration: duration,
    });
  };

  const handleDateChange = (date) => {
    setCurrentTask(() => ({
      ...task,
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
    setCurrentTask(() => ({
      ...task,
      task_is_complete: e.target.checked,
    }));
    updateObject("task", currentTask.task_id, {
      ...currentTask,
      task_is_complete: e.target.checked,
    });
  };
  //Delete task
  const handleDeleteTask = () => {
    deleteObject("task", task.task_id);
  };

  return (
    <div
      className={[
        c.taskItem,
        currentTask?.task_is_complete && c.completed,
      ].join(" ")}
    >
      <div className={c.taskContainer}>
        <Checkbox
          onChange={checkboxHandler}
          checked={currentTask?.task_is_complete}
        ></Checkbox>
        <div className={c.task}>
          <EditableInput
            input={currentTask?.task_title}
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
              value={dayjs(new Date(currentTask?.task_start_time))}
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
