const test = require('tape')
const CalculateDueDate = require('../index')

test('should throw error if problem wasn\'t reported during working hours', t => {
  const turnaroundTime = 2
  const submitDate = '2017-03-29 6:00:00.000 GMT+00:00'

  t.throws(() => CalculateDueDate(submitDate, turnaroundTime))
  t.end()
})

test('should return submit day later if the problem should be finished that day', t => {
  const turnaroundTime = 2
  const submitDate = '2017-03-29 13:00:00.000 GMT+00:00'
  const dueDate = CalculateDueDate(submitDate, turnaroundTime)
  const equivalentDate = new Date('2017-03-29 15:00:00.000 GMT+00:00')

  t.equal(dueDate.getTime(), equivalentDate.getTime())
  t.end()
})

test('should return date 2 whole days after submit date', t => {
  const turnaroundTime = 16
  const submitDate = '2017-03-28 13:00:00.000 GMT+00:00'
  const dueDate = CalculateDueDate(submitDate, turnaroundTime)
  const equivalentDate = new Date('2017-03-30 13:00:00.000 GMT+00:00')

  t.equal(dueDate.getTime(), equivalentDate.getTime())
  t.end()
})

test('should return accurate date if long turnaround time is given', t => {
  const turnaroundTime = 89
  const submitDate = '2017-03-29 13:00:00.000 GMT+00:00'
  const dueDate = CalculateDueDate(submitDate, turnaroundTime)
  const equivalentDate = new Date('2017-04-13 14:00:00.000 GMT+00:00')

  t.equal(dueDate.getTime(), equivalentDate.getTime())
  t.end()
})
