import React, { useState, useRef, useEffect, useContext } from "react";
import c from "./schedule-full-calendar.module.scss";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Data } from "../../providers/DataProvider";
import { createPortal } from "react-dom";
import TaskItem from "../tasks/task-item/TaskItem";

function Schedule() {
  const { tasks, pots } = useContext(Data);

  const tasksFullCalendar = tasks?.map((task) => ({
    title: task.task_title,
    start: task.task_start_time,
    id: task.task_id,
    pot_id: task.task_pot_id,
    end: new Date(
      new Date(task.task_start_time).getTime() + task.task_duration * 60000
    ), // Convert duration to milliseconds and add to start time
    allDay: false,
  }));

  const calendarRef = useRef();
  const [openModal, setOpenModal] = useState(false);

  const [clickedEventId, setClickedEventId] = useState();
  const handleViewTask = (event) => {
    setOpenModal(true);
    setClickedEventId(event.id);
  };
  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Include required plugins here
      initialView: "timeGridWeek",
      headerToolbar: {
        left: "title",
        // center: "prev,next today",
        // left: "prev,next today",
        // center: "title",
        right: "today prev,next timeGridWeek,timeGridDay",
      },
      editable: true,
      droppable: true,
      dayMaxEvents: true,
      events: tasksFullCalendar,
      allDaySlot: false,
      nowIndicator: true,
      eventColor: "var(--background-color)",
      eventClick: function (info) {
        handleViewTask(info.event);
      },
    });

    calendar.render();

    return () => {
      calendar.destroy(); // cleanup when component unmounts
    };
  }, []); // empty dependency array to run effect only once after initial render

  return (
    <div className={c.scheduleContainer}>
      {openModal &&
        createPortal(
          <div className={c.modalContainer}>
            <div className={c.modalCard}>
              {tasks?.map((task) => {
                if (task.task_id === clickedEventId) {
                  return <TaskItem task={task} potId={task.task_pot_id} />;
                }
              })}
              <button onClick={() => setOpenModal(!openModal)}>Close</button>
            </div>
          </div>,
          document.getElementById("root")
        )}

      <div ref={calendarRef}></div>
    </div>
  );
}

export default Schedule;
