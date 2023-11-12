/* eslint-disable react/prop-types */
import {
  add,
  format,
  isSameDay,
  fromUnixTime,
  differenceInMinutes,
} from 'date-fns'
import c from './dayView.module.scss'

const DayView = ({ numberOfDisplayDays, daysValue, events }) => {
  const nextDay = (day, number) => add(day, { days: number })

  const getTaskById = (id) => {
    return events.tasks.filter(function (data) {
      return data.task_id == id
    })
  }
  return (
    <div>
      <div className={c.dayColumn}>
        {Object.entries(events.blocks).map(([k, v], i) => {})}
      </div>
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
                {Object.entries(events.blocks).map(([keys, block], i) => {
                  const eventDate = fromUnixTime(block.start_time)
                  const top = `${
                    eventDate.getHours() * 28 +
                    (eventDate.getMinutes() / 60) * 28
                  }px`

                  const height = `${
                    (differenceInMinutes(
                      fromUnixTime(block.end_time),
                      fromUnixTime(block.start_time)
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
                        {block.tasks.map((task) => {
                          return (
                            <li key={task.task_id}>
                              {getTaskById(task.task_id)[0].task_title}
                            </li>
                          )
                        })}
                      </div>
                    )
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
