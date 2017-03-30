const test = require('tape')
const helpers = require('../helpers')

test('should convert hours to millisec', t => {
  const hours = 2
  const millisec = helpers.convertHoursToMillisec(hours)
  t.equal(millisec, 7200000)
  t.end()
})

test('should be true if it was reported during working hours', t => {
  const submitDate = '2017-03-30 13:00:00.000 GMT+00:00'
  const answer = helpers.wasReportedDuringWorkHour(submitDate)
  t.equal(answer, true)
  t.end()
})

test('should be false if it wasn\'t reported during working hours', t => {
  const submitDate = '2017-03-30 8:00:00.000 GMT+00:00'
  const answer = helpers.wasReportedDuringWorkHour(submitDate)
  t.equal(answer, false)
  t.end()
})

test('should count the working hours left on a day', t => {
  const submitDate = '2017-03-30 12:00:00.000 GMT+00:00'
  const hoursLeft = helpers.getHoursLeftOnSubmitDay(submitDate)
  t.equal(hoursLeft, 5)
  t.end()
})

test('should count new date from former date and hours passed', t => {
  const submitDate = '2017-03-30 12:00:00.000 GMT+00:00'
  const hoursPassed = 48
  const newDate = helpers.getNewDate(submitDate, hoursPassed)
  const equivalentDate = new Date('2017-04-01 12:00:00.000 GMT+00:00')

  t.equal(newDate.getTime(), equivalentDate.getTime())
  t.end()
})

test('should add weekends to interval', t => {
  const submitDate = '2017-03-31 12:00:00.000 GMT+00:00'
  const numberOfWorkDays = 2
  const numberOfDaysWithHoliday = helpers.addHolidays(submitDate, numberOfWorkDays)

  t.equal(numberOfDaysWithHoliday, 4)
  t.end()
})

test('should not add any holidays', t => {
  const submitDate = '2017-03-28 12:00:00.000 GMT+00:00'
  const numberOfWorkDays = 2
  const numberOfDaysWithHoliday = helpers.addHolidays(submitDate, numberOfWorkDays)

  t.equal(numberOfDaysWithHoliday, 2)
  t.end()
})
