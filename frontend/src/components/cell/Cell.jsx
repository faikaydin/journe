/* eslint-disable react/prop-types */
import c from './cell.module.scss'

const Cell = ({
  onClick,
  className,
  today,
  displayDate,
  notCurrentMonth,
  children,
}) => {
  return (
    <div
      className={[
        c.cell,
        today && c.today,
        displayDate && c.displayDate,
        notCurrentMonth && c.currentMonth,
        className,
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
export default Cell
