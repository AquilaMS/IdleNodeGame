const request = require('supertest')
const app = require('../src/app')
const fakeUsers = require('./fakeusers')
const authServices = require('../src/services/auth')
const jwt = require('jwt-simple')

const SECRET = 'super hyper secret'

const POWERUPS_ROUTE = '/powerups'
const USERS_ROUTE = '/user'

beforeAll(async () => {
  const res = await authServices.createUser(fakeUsers.fake_user3)
  user1 = { ...res }
  user1.token = jwt.encode(user1.insertedUser[0], SECRET)

  const res2 = await authServices.createUser(fakeUsers.fake_user3)
  user2 = { ...res2 }
})

fake_power_up = { objname: 'Alchemy Lab', price: 10, multiplier: 2 }
test('buy powerup', () => {
  return request(app)
    .post(`${POWERUPS_ROUTE}/buy/1`)
    .set('authorization', `bearer ${user1.token}`)
    .then(res => {
      expect(res.body).toBe(3.00)
    })
})
