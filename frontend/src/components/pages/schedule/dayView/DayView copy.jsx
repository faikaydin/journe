/* eslint-disable react/prop-types */
import { add, format, isSameDay, differenceInMinutes } from "date-fns";
import { createPortal } from "react-dom";

// @ts-ignore
import c from "./dayView.module.scss";
import React, { useState, useContext } from "react";
import { Data } from "../../../providers/DataProvider";

const DayView = ({ numberOfDisplayDays, daysValue }) => {
  const nextDay = (day, number) => add(day, { days: number });
  const { blocks, tasks, updateObject } = useContext(Data);

  const [openModal, setOpenModal] = useState(false);
  //Handle block
  const [newBlock, setNewBlock] = useState({
    block_id: "",
    block_end_time: "",
    block_start_time: "",
  });

  const updateBlockHandler = (block) => {
    setOpenModal(true);
    setNewBlock(block);
  };

  const handleBlockInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewBlock((prevBlock) => ({
      ...prevBlock,
      [name]: value,
    }));
  };

  const handleUpdateBlock = (e) => {
    e.preventDefault();

    if (newBlock.block_id) {
      updateObject("block", newBlock.block_id, {
        ...newBlock,
      });
    }
  };
  return (
    <div>
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
                {blocks &&
                  blocks.map((block, i) => {
                    if (block.block_id) {
                      const eventDate = new Date(block.block_start_time);

                      const top = `${
                        eventDate.getHours() * 28 +
                        (eventDate.getMinutes() / 60) * 28
                      }px`;

                      const height = `${
                        (differenceInMinutes(
                          new Date(block.block_end_time),
                          new Date(block.block_start_time)
                        ) /
                          60) *
                        28
                      }px`;

                      if (isSameDay(newDate, eventDate)) {
                        return (
                          <div
                            key={i}
                            className={c.event}
                            style={{ top: top, height: height }}
                          >
                            <button onClick={() => updateBlockHandler(block)}>
                              Open
                            </button>
                            {block.block_id}
                            {openModal &&
                              createPortal(
                                <div className={c.modalContainer}>
                                  <div className={c.modalCard}>
                                    <div>
                                      <div>{block.block_start_time}</div>

                                      <input
                                        name="block_start_time"
                                        value={newBlock.block_start_time}
                                        onChange={(e) => {
                                          handleBlockInputChange(e);
                                        }}
                                      ></input>
                                      <div>{block.block_end_time}</div>
                                      <input
                                        name="block_end_time"
                                        value={newBlock.block_end_time}
                                        onChange={(e) =>
                                          handleBlockInputChange(e)
                                        }
                                      ></input>
                                    </div>
                                    {tasks?.map((task, i) => {
                                      if (
                                        task.task_block_id === block.block_id
                                      ) {
                                        return (
                                          <div key={i} className={c.item}>
                                            <div>
                                              <input
                                                type="checkbox"
                                                id={task.task_title}
                                                name={task.task_title}
                                              />
                                              <label htmlFor={task.task_title}>
                                                {task.task_title}
                                              </label>
                                            </div>
                                          </div>
                                        );
                                      }
                                    })}
                                    <button
                                      onClick={(e) => handleUpdateBlock(e)}
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() => setOpenModal(!openModal)}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>,
                                // @ts-ignore
                                document.getElementById("root")
                              )}
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
