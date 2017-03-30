'use strict'
const helpers = require('./helpers')

module.exports = function CalculateDueDate (submitDate, turnaroundTime) {
  if (!helpers.wasReportedDuringWorkHour(submitDate)) {
    throw new Error('The problem wasn\'t reported during working hours')
  }

  let daysWithoutHolidays = 0
  let remainingWorkHours = 0

  const submitDayHoursLeft = helpers.getHoursLeftOnSubmitDay(submitDate, turnaroundTime)
  const hoursLeftAfterSubmitDay = Math.max(turnaroundTime - submitDayHoursLeft, 0)
  const submitDayHoursPassed = (8 - submitDayHoursLeft)

  const fullWorkDaysRequired = Math.floor(hoursLeftAfterSubmitDay / 8)
  daysWithoutHolidays += fullWorkDaysRequired

  daysWithoutHolidays += (submitDayHoursLeft < turnaroundTime) ? 1 : 0
  remainingWorkHours += (submitDayHoursLeft < turnaroundTime)
    ? (hoursLeftAfterSubmitDay % 8) - submitDayHoursPassed
    : (turnaroundTime % 8)

  const daysWithHolidays = helpers.addHolidays(submitDate, daysWithoutHolidays)
  const durationInHours = 24 * daysWithHolidays + remainingWorkHours
  const dueDate = helpers.getNewDate(submitDate, durationInHours)

  console.log(dueDate)

  return dueDate
}
