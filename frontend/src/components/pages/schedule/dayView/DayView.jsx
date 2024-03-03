/* eslint-disable react/prop-types */
import { add, format, isSameDay, differenceInMinutes } from "date-fns";
import { createPortal } from "react-dom";

// @ts-ignore
import c from "./dayView.module.scss";
import React, { useState, useContext } from "react";
import { Data } from "../../../providers/DataProvider";
import TaskItem from "../../tasks/task-item/TaskItem";

const DayView = ({ numberOfDisplayDays, daysValue }) => {
  const nextDay = (day, number) => add(day, { days: number });
  const { pots, tasks, updateObject } = useContext(Data);
  const [openModal, setOpenModal] = useState(false);

  const [currentTask, setCurrentTask] = useState({
    task_description: "",
    task_start_time: "",
    task_duration: "",
    task_id: "",
    task_title: "",
    task_pot_id: "",
  });
  const handleViewTask = (task) => {
    setOpenModal(true);
    setCurrentTask({ ...task });
  };
  console.log(pots);
  return (
    <div className={c.viewContainer}>
      {openModal &&
        createPortal(
          <div className={c.modalContainer}>
            <div className={c.modalCard}>
              {pots?.map((pot) => {
                console.log(pot.pot_id === currentTask.task_pot_id);
                if (pot.pot_id === currentTask.task_pot_id) {
                  return <strong>{pot.pot_title}</strong>;
                }
              })}
              <TaskItem task={currentTask} potId={currentTask.task_pot_id} />
              <button onClick={() => setOpenModal(!openModal)}>Close</button>
            </div>
          </div>,
          // @ts-ignore
          document.getElementById("root")
        )}

      <div className={c.datesContainer}>
        {Array.from({ length: numberOfDisplayDays }, (v, i) => {
          const newDate = nextDay(daysValue, i);
          return <div key={i}>{format(newDate, "d LLL yyyy")}</div>;
        })}
      </div>
      <div className={c.scheduleWrapper}>
        <div className={c.hourGrid}>
          {Array.from({ length: 24 }, (v, i) => {
            return (
              <div className={c.hour} key={i}>
                {i}
              </div>
            );
          })}
        </div>
        <div className={c.gridWrapper}>
          {Array.from({ length: numberOfDisplayDays }, (v, i) => {
            const newDate = nextDay(daysValue, i);
            return (
              <div key={i}>
                {tasks &&
                  tasks.map((task, i) => {
                    if (task.task_id) {
                      const eventDate = new Date(task.task_start_time);

                      const top = `${
                        eventDate.getHours() * 40 +
                        (eventDate.getMinutes() / 60) * 40
                      }px`;

                      const height = `${(task.task_duration / 60) * 40}px`;

                      if (isSameDay(newDate, eventDate)) {
                        return (
                          <div
                            key={i}
                            className={c.event}
                            style={{ top: top, height: height }}
                            onClick={() => handleViewTask(task)}
                          >
                            {task.task_title}
                          </div>
                        );
                      }
                    }
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayView;
