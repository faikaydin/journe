import React from "react";
import c from "./task-list.module.scss";
import TaskItem from "../task-item/TaskItem";
const TaskList = ({ tasks, pot }) => {
  return (
    <div className={c.listContainer}>
      {tasks?.map((task, i) => {
        if (task.task_pot_id === pot.pot_id) {
          return <TaskItem key={i} task={task} potId={pot.pot_id} />;
        }
      })}
    </div>
  );
};

export default TaskList;
