/* eslint-disable react/prop-types */
import { add, format, isSameDay, differenceInMinutes } from 'date-fns'
import c from './dayView.module.scss'
import { useState, useEffect } from 'react'

const DayView = ({ numberOfDisplayDays, daysValue }) => {
  const nextDay = (day, number) => add(day, { days: number })

  const [block, setBlock] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/block`, { method: 'GET' }).then((res) =>
      res.json().then((data) => {
        setBlock(data)
      })
    )
  }, [])

  return (
    <div>
      <div className={c.datesContainer}>
        {Array.from({ length: numberOfDisplayDays }, (v, i) => {
          const newDate = nextDay(daysValue, i)
          return <div key={i}>{format(newDate, 'd LLL yyyy')}</div>
        })}
      </div>
      <div className={c.scheduleWrapper}>
        <div className={c.hourGrid}>
          {Array.from({ length: 24 }, (v, i) => {
            return (
              <div className={c.hour} key={i}>
                {i}
              </div>
            )
          })}
        </div>
        <div className={c.gridWrapper}>
          {Array.from({ length: numberOfDisplayDays }, (v, i) => {
            const newDate = nextDay(daysValue, i)
            return (
              <div key={i}>
                {block &&
                  Object.entries(block?.block).map(([keys, block], i) => {
                    if (block.block_id) {
                      const eventDate = new Date(block.block_start_time)

                      const top = `${
                        eventDate.getHours() * 28 +
                        (eventDate.getMinutes() / 60) * 28
                      }px`

                      const height = `${
                        (differenceInMinutes(
                          new Date(block.block_end_time),
                          new Date(block.block_start_time)
                        ) /
                          60) *
                        28
                      }px`

                      if (isSameDay(newDate, eventDate)) {
                        return (
                          <div
                            key={i}
                            className={c.event}
                            style={{ top: top, height: height }}
                          >
                            {block?.tasks?.map((task) => {
                              return (
                                <li key={task.task_id}>
                                  {getTaskById(task.task_id)[0].task_title}
                                </li>
                              )
                            })}
                          </div>
                        )
                      }
                    }
                  })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DayView
