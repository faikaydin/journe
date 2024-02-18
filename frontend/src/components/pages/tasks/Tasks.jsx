import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import c from "./tasks.module.scss";
import { Data } from "../../providers/DataProvider";
import Icon from "../../../assets/Icon";
import TaskCard from "./task-card/TaskCard";
const Tasks = () => {
  const { tasks, pots, createObject, updateObject, deleteObject } =
    useContext(Data);
  // Handle tasks
  const [newTask, setNewTask] = useState({
    task_description: "",
    task_start_time: "",
    task_duration: "",
    task_id: "",
    task_title: "",
  });

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask.task_id) {
      updateObject("task", newTask.task_id, {
        ...newTask,
      });
    } else {
      createObject("task", {
        ...newTask,
        task_pot_id: currentPotId,
        task_id: uuidv4(),
      });
    }

    setNewTask({
      task_description: "",
      task_start_time: "",
      task_duration: "",
      task_id: "",
      task_title: "",
    });
    setAddTask(false);
  };

  const [addTask, setAddTask] = useState(false);
  const [currentPotId, setCurrentPotId] = useState();

  const addTaskHandler = (potId) => {
    setAddTask(true);
    setCurrentPotId(potId);
  };
  const updateTaskHandler = (task) => {
    setAddTask(true);
    setNewTask(task);
  };
  const deleteTaskHandler = (taskId) => {
    deleteObject("task", taskId);
  };

  //Handle pots
  const [newPot, setNewPot] = useState({
    pot_description: "",
    pot_id: "",
    pot_title: "",
  });
  const [addPot, setAddPot] = useState(false);

  const handlePotInputChange = (e) => {
    const { name, value } = e.target;
    setNewPot((prevPot) => ({
      ...prevPot,
      [name]: value,
    }));
  };

  const handleAddPot = (e) => {
    e.preventDefault();

    if (newPot.pot_id) {
      updateObject("pot", newPot.pot_id, newPot);
    } else {
      createObject("pot", {
        ...newPot,
        pot_id: uuidv4(),
      });
    }

    setNewPot({
      pot_description: "",
      pot_id: "",
      pot_title: "",
    });
    setAddPot(false);
  };
  const addPotHandler = () => {
    setAddPot(true);
  };

  const updatePotHandler = (pot) => {
    setAddPot(true);
    setNewPot({
      pot_description: pot.pot_description,
      pot_id: pot.pot_id,
      pot_title: pot.pot_title,
    });
  };
  const deletePotHandler = (potId) => {
    deleteObject("pot", potId);
  };

  return (
    <>
      {addTask &&
        createPortal(
          <div className={c.addTaskContainer}>
            <div className={c.addTaskCard}>
              <h1>Add Task</h1>
              <form>
                <input
                  placeholder="Task title"
                  name="task_title"
                  value={newTask.task_title}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <input
                  placeholder="Task description"
                  name="task_description"
                  value={newTask.task_description}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <input
                  placeholder="2024-00-00 00:00:00"
                  name="task_start_time"
                  value={newTask.task_start_time}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <input
                  placeholder="Task duration"
                  name="task_duration"
                  type="number"
                  value={newTask.task_duration}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <button onClick={(e) => handleAddTask(e)}>
                  {newTask.task_id ? "Update" : "Add"}
                </button>
                <button onClick={() => setAddTask(false)}>Close</button>
              </form>
            </div>
          </div>,
          document.getElementById("root")
        )}

      {addPot &&
        createPortal(
          <div className={c.addTaskContainer}>
            <div className={c.addTaskCard}>
              <h1>Add Pot</h1>
              <form>
                <input
                  placeholder="Pot title"
                  name="pot_title"
                  value={newPot.pot_title}
                  onChange={(e) => handlePotInputChange(e)}
                ></input>
                <input
                  placeholder="Pot description"
                  name="pot_description"
                  value={newPot.pot_description}
                  onChange={(e) => handlePotInputChange(e)}
                ></input>

                <button onClick={(e) => handleAddPot(e)}>
                  {newPot.pot_id ? "Update" : "Add"}
                </button>
                <button onClick={() => setAddPot(false)}>Close</button>
              </form>
            </div>
          </div>,
          document.getElementById("root")
        )}
      <div className={c.potsContainer}>
        {pots && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter={"2rem"}>
              {pots?.map((pot) => {
                return (
                  <TaskCard
                    pot={pot}
                    tasks={tasks}
                    key={pot.pot_id}
                    deletePotHandler={deletePotHandler}
                  />
                  // <div key={pot.pot_id} className={c.potContainer}>
                  //   <div className={c.potTitleRow}>
                  //     <strong>{pot.pot_title}</strong>
                  //     <div className={c.buttonContainer}>
                  //       {pot.pot_title !== "task_platter" && (
                  //         <button
                  //           className={c.deleteButton}
                  //           onClick={() => updatePotHandler(pot)}
                  //         >
                  //           <Icon.Pencil />
                  //         </button>
                  //       )}
                  //       {pot.pot_title !== "task_platter" && (
                  //         <button
                  //           className={c.deleteButton}
                  //           onClick={() => deletePotHandler(pot.pot_id)}
                  //         >
                  //           <Icon.Trash />
                  //         </button>
                  //       )}
                  //     </div>
                  //   </div>

                  //   {tasks?.map((task, i) => {
                  //     if (task.task_pot_id === pot.pot_id) {
                  //       return (
                  //         <div key={i} className={c.taskItem}>
                  //           <div>
                  //             <input
                  //               type="checkbox"
                  //               id={task.task_title}
                  //               name={task.task_title}
                  //             />
                  //             <label htmlFor={task.task_title}>
                  //               {task.task_title}
                  //             </label>
                  //             <span> {task.task_duration}</span>
                  //           </div>
                  //           <div className={c.buttonContainer}>
                  //             <button
                  //               className={c.deleteButton}
                  //               onClick={() => updateTaskHandler(task)}
                  //             >
                  //               <Icon.Pencil />
                  //             </button>
                  //             <button
                  //               className={c.deleteButton}
                  //               onClick={() => deleteTaskHandler(task.task_id)}
                  //             >
                  //               <Icon.Trash />
                  //             </button>
                  //           </div>
                  //         </div>
                  //       );
                  //     }
                  //   })}
                  //   <button onClick={() => addTaskHandler(pot.pot_id)}>
                  //     Add task
                  //   </button>
                  // </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <button onClick={addPotHandler}>Add pot</button>
      </div>
    </>
  );
};
export default Tasks;
