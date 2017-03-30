'use strict'

module.exports = {
  convertHoursToMillisec (numOfHours) {
    return numOfHours * 60 * 60 * 1000
  },

  wasReportedDuringWorkHour (submitDate) {
    const submitHour = new Date(submitDate).getUTCHours()
    return submitHour > 9 && submitHour < 17
  },

  getHoursLeftOnSubmitDay (submitDate) {
    const submitMinute = new Date(submitDate).getUTCMinutes()
    const submitHour = new Date(submitDate).getUTCHours() + Math.ceil(submitMinute / 60)

    return (17 - submitHour)
  },

  getNewDate (submitDate, durationInHours) {
    const date = new Date(submitDate).getTime()
    const newDate = date + this.convertHoursToMillisec(durationInHours)

    return new Date(newDate)
  },

  addHolidays (submitDate, numOfWorkDays) {
    const dayAfterSubmitDay = new Date(submitDate).getUTCDay() + 1

    let i = 0
    while (numOfWorkDays > 0) {
      let dayIndex = (dayAfterSubmitDay + i) % 7
      if (dayIndex !== 6 && dayIndex !== 0) {
        numOfWorkDays--
      }
      i++
    }
    return i
  }
}
