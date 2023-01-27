const request = require('supertest')
const app = require('../src/app')
const fakeUsers = require('./fakeusers')
const authServices = require('../src/services/auth')
const jwt = require('jwt-simple')

const SECRET = 'super hyper secret'

const POWERUPS_ROUTE = '/powerups'

beforeAll(async () => {
  const res = await authServices.createUser(fakeUsers.fake_user3)
  user1 = { ...res }
  user1.token = jwt.encode(user1.insertedUser[0], SECRET)

})

fake_power_up = { objname: 'Alchemy Lab', price: 10, multiplier: 2 }
test('buy powerup', () => {
  return request(app)
    .post(`${POWERUPS_ROUTE}/buy/1`)
    .set('authorization', `bearer ${user1.token}`)
    .then(res => {
      expect(res.body.newMultiplier).toBe(3.00)
      expect(res.body.newBalance).toBeLessThan(res.body.oldBalance)
    })
})

test('buy powerup with no balance', () => {
  return request(app)
    .post(`${POWERUPS_ROUTE}/buy/2`)
    .set('authorization', `bearer ${user1.token}`)
    .then(res => {
      expect(res.body.error).toBe('Insuficient balance')
    })
})