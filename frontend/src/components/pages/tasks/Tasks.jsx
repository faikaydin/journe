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
  // const [newTask, setNewTask] = useState({
  //   task_description: "",
  //   task_start_time: "",
  //   task_duration: "",
  //   task_id: "",
  //   task_title: "",
  // });

  // const handleTaskInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewTask((prevTask) => ({
  //     ...prevTask,
  //     [name]: value,
  //   }));
  // };

  // const handleAddTask = (e) => {
  //   e.preventDefault();

  //   if (newTask.task_id) {
  //     updateObject("task", newTask.task_id, {
  //       ...newTask,
  //     });
  //   } else {
  //     createObject("task", {
  //       ...newTask,
  //       task_pot_id: currentPotId,
  //       task_id: uuidv4(),
  //     });
  //   }

  //   setNewTask({
  //     task_description: "",
  //     task_start_time: "",
  //     task_duration: "",
  //     task_id: "",
  //     task_title: "",
  //   });
  //   setAddTask(false);
  // };

  // const [addTask, setAddTask] = useState(false);

  const [currentPotId, setCurrentPotId] = useState();

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
  // const deletePotHandler = (potId) => {
  //   deleteObject("pot", potId);
  // };

  return (
    <>
      {/* {addPot &&
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
        )} */}
      <div className={c.potsContainer}>
        {pots && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter={"2rem"}>
              {pots?.map((pot) => {
                return <TaskCard pot={pot} tasks={tasks} key={pot.pot_id} />;
              })}

              {addPot && (
                <TaskCard pot={newPot} tasks={[]} key={newPot.pot_id} />
              )}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <button onClick={addPotHandler}>Add pot</button>
      </div>
    </>
  );
};
export default Tasks;
