const request = require('supertest')
const app = require('../src/app')

const MAIN_ROUTE = '/user'

//
let fake_user1 = {
  name: 'testName',
  email: 'test@test.com',
  password: '123',
  balance: 0,
  outDate: new Date('2021-03-25'),
  inDate: new Date('2021-03-26'),
  sumMultiplier: 2
}

fake_power_up = { objname: 'Alchemy Lab', price: 10, multiplier: 2 }

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

test('buy power up', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/buypowerup`)
    .send({ powerup: fake_power_up, user: fake_user1 })
    .then(res => {
      expect(res.status).toBe(200)
      const newBalance = fake_user1.balance - fake_power_up.price
      if (!res.body.error) {
        expect(res.body).toBe(newBalance)
        expect(newBalance).toBeGreaterThanOrEqual(0)
        expect(res.body).toHaveProperty('newMultiplier')
        expect(res.body).toHaveProperty('newBalance')
      }
    })
})

