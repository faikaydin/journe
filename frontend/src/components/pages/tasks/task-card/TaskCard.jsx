import React, { useState } from "react";
import c from "./task-card.module.scss";
import Icon from "../../../../assets/Icon";
import EditableInput from "../../../utils/editable-input/EditableInput";
import TaskList from "../task-list/TaskList";
const TaskCard = ({ pot, tasks, updatePotHandler, deletePotHandler }) => {
  const [potTitle, setPotTitle] = useState(pot.pot_title);
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle receiving the updated title from EditableInput
  const handleTitleUpdate = (newTitle) => {
    setPotTitle(newTitle);
    // updatePotHandler();
  };

  return (
    <div
      key={pot.pot_id}
      className={c.cardContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          {/* {pot.pot_title !== "task_platter" && (
            <button
              className={c.deleteButton}
              onClick={() => updatePotHandler(pot)}
            >
              <Icon.Pencil />
            </button>
          )} */}
          {pot.pot_title !== "task_platter" && (
            <button
              className={[c.deleteButton, isHovered ? c.show : c.hide].join(
                " "
              )}
              onClick={() => deletePotHandler(pot.pot_id)}
            >
              <Icon.Trash />
            </button>
          )}
        </div>
      </div>
      <TaskList tasks={tasks} pot={pot} />
      <div className={c.addNewTask}>
        <button onClick={() => addTaskHandler(pot.pot_id)}>
          <Icon.Add />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
