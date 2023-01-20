const request = require('supertest')
const app = require('../src/app')

const MAIN_ROUTE = '/user'

//
let fake_user1 = {
  name: 'testName',
  balance: 0,
  outDate: new Date('2021-03-25'),
  inDate: new Date('2021-03-26'),
  sumMultiplier: 2
}

test('get all user data', () => {
  return request(app)
    .post(`${MAIN_ROUTE}`)
    .send(fake_user1).then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('balance')
      expect(res.body).toHaveProperty('outDate')
      expect(res.body).toHaveProperty('inDate')
      expect(res.body).toHaveProperty('sumMultiplier')
      expect(typeof res.body.name).toBe('string')
      expect(typeof res.body.balance).toBe('number')
      expect(new Date(res.body.outDate).getTime()).not.toBeNaN();
      expect(new Date(res.body.inDate).getTime()).not.toBeNaN();
      expect(typeof res.body.sumMultiplier).toBe('number')
    })
})

test('update balance', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/update`)
    .send(fake_user1)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toBe(172800)
    })
})

