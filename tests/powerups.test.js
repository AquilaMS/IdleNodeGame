const request = require('supertest')
const app = require('../src/app')
const powerup = require('../src/services/powerups')
const fakeUsers = require('./fakeusers')
const authServices = require('../src/services/auth')
const jwt = require('jwt-simple')

const SECRET = 'super hyper secret'
const MAIN_ROUTE = '/powerups'

beforeAll(async () => {
  const res = await authServices.createUser(fakeUsers.fake_user3)
  user = { ...res }
  user.token = jwt.encode(user.insertedUser[0], SECRET)
})

test('get one powerup', () => {
  return request(app)
    .post(`${MAIN_ROUTE}`)
    .send({ index: 1 })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('objname')
      expect(res.body).toHaveProperty('price')
      expect(res.body).toHaveProperty('multiplier')
    })
})

test('get all powerup', () => {
  return request(app)
    .get(`${MAIN_ROUTE}`)
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(powerup.powerupList.length)
    })
})