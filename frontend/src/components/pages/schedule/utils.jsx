import { isMonday, previousMonday } from 'date-fns'

export const getMonday = (date) => {
  if (isMonday(date)) {
    return date
  } else {
    return previousMonday(date)
  }
}
