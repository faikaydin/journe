/* eslint-disable react/prop-types */
import { add, format, isSameDay, differenceInMinutes } from 'date-fns'
import c from './dayView.module.scss'
import { useContext } from 'react'
import { Data } from '../../providers/DataProvider'

const DayView = ({ numberOfDisplayDays, daysValue }) => {
  const nextDay = (day, number) => add(day, { days: number })
  const { blocks, tasks } = useContext(Data)
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
                {blocks &&
                  blocks.map((block, i) => {
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
                            {tasks?.map((task, i) => {
                              if (task.task_block_id === block.block_id) {
                                return (
                                  <div key={i} className={c.item}>
                                    <input
                                      type="checkbox"
                                      id={task.task_title}
                                      name={task.task_title}
                                    />
                                    <label htmlFor={task.task_title}>
                                      {task.task_title}
                                    </label>
                                  </div>
                                )
                              }
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
