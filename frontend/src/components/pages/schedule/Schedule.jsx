import { useState, useEffect } from 'react'
import Calendar from './calendar/Calendar'
import c from './schedule.module.scss'
import DayView from './dayView/DayView'
import events from '../../../assets/sampleData.json'
import { format, nextSunday, sub, add } from 'date-fns'
import { getMonday } from './utils'
import Icon from '../../../assets/Icon'

function Schedule() {
  const [today] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(getMonday(new Date()))
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const backToTodayHandler = () => {
    setSelectedMonth(today)
  }

  const preWeek = () => setSelectedDate(sub(selectedDate, { weeks: 1 }))
  const nextWeek = () => setSelectedDate(add(selectedDate, { weeks: 1 }))

  // Weekly calendar only
  const numberOfDisplayDays = 7

  // Show or hide date picker
  const [showMiniCalendar, setShowMiniCalendar] = useState(false)

  return (
    <>
      <div className={c.scheduleContainer}>
        <div className={c.displayDateContainer}>
          <div className={c.displayDateSelector}>
            <div className={c.weekNavigator} onClick={preWeek}>
              <Icon.ChevronLeft />
            </div>
            <div
              onClick={() => {
                setShowMiniCalendar(!showMiniCalendar)
              }}
              className={c.displayDates}
            >
              {format(selectedDate, 'd LLL')} -{' '}
              {format(nextSunday(selectedDate), 'd LLL yyyy')}
            </div>
            <div className={c.weekNavigator} onClick={nextWeek}>
              <Icon.ChevronRight />
            </div>

            {showMiniCalendar ? (
              <Calendar
                selectedDate={selectedDate}
                onSelectedDateChange={setSelectedDate}
                numberOfDisplayDays={numberOfDisplayDays}
                selectedMonth={selectedMonth}
                onSelectedMonthChange={setSelectedMonth}
                today={today}
              />
            ) : null}
          </div>
          <button onClick={backToTodayHandler} className={c.backToToday}>
            <Icon.Calendar />
          </button>
        </div>

        <DayView
          numberOfDisplayDays={numberOfDisplayDays}
          daysValue={selectedDate}
        ></DayView>
      </div>
    </>
  )
}

export default Schedule
