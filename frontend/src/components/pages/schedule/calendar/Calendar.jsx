/* eslint-disable react/prop-types */
import c from './calendar.module.scss'
import {
  differenceInDays,
  endOfMonth,
  startOfMonth,
  sub,
  format,
  add,
  getMonth,
  isSameDay,
  getYear,
  getDaysInMonth,
} from 'date-fns'
import { getMonday } from '../utils'
import Cell from '../../../utils/cell/Cell'

const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = ({
  selectedDate,
  onSelectedDateChange,
  selectedMonth,
  onSelectedMonthChange,
  today,
  numberOfDisplayDays,
}) => {
  // Display Calendar
  const startDate = startOfMonth(selectedMonth)
  const endDate = endOfMonth(selectedMonth)
  const numberOfDays = differenceInDays(endDate, startDate) + 1

  const prefixDays = startDate.getDay()
  const numberOfDatesLastMonth = getDaysInMonth(
    sub(selectedMonth, { months: 1 })
  )
  const suffixDays = 6 - endDate.getDay()

  const preMonth = () =>
    onSelectedMonthChange(sub(selectedMonth, { months: 1 }))
  const nextMonth = () =>
    onSelectedMonthChange(add(selectedMonth, { months: 1 }))

  // All displayed dates
  const nextDay = (day, number) => add(day, { days: number })

  const isIncludesSameDay = (day1, day2) => {
    for (let i = 0; i < numberOfDisplayDays; i++) {
      if (isSameDay(day1, nextDay(day2, i))) {
        return true
      }
    }
  }

  return (
    <>
      <div className={c.calendarContainer}>
        <Cell>{'<<'}</Cell>
        <Cell onClick={preMonth}>{'<'}</Cell>
        <Cell className={c.month}>{format(selectedMonth, 'LLL yyyy')}</Cell>
        <Cell onClick={nextMonth}>{'>'}</Cell>
        <Cell>{'>>'}</Cell>

        {/* Day Name */}
        {dayOfWeek.map((day, i) => (
          <Cell key={i} today={today === day}>
            {day}
          </Cell>
        ))}

        {/* Last Month */}
        {Array.from({ length: prefixDays }, (v, i) => {
          const date = i + 1
          return (
            <Cell key={date} notCurrentMonth={true}>
              {numberOfDatesLastMonth - prefixDays + i + 1}
            </Cell>
          )
        })}

        {/* Current Month */}
        {Array.from({ length: numberOfDays }, (v, i) => {
          const date = i + 1

          const newDate = new Date(
            getYear(selectedMonth),
            getMonth(selectedMonth),
            date
          )

          return (
            <Cell
              key={date}
              today={isSameDay(newDate, today)}
              displayDate={isIncludesSameDay(newDate, selectedDate)}
              onClick={() => {
                onSelectedDateChange(getMonday(newDate))
              }}
            >
              {date}
            </Cell>
          )
        })}

        {/* Next Month */}
        {Array.from({ length: suffixDays }, (v, i) => {
          const date = i + 1
          return (
            <Cell key={date} notCurrentMonth={true}>
              {date}
            </Cell>
          )
        })}
      </div>
    </>
  )
}

export default Calendar
