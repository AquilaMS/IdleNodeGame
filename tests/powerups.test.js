const request = require('supertest')
const app = require('../src/app')
const powerup = require('../src/services/powerupslist')
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
    .post(`${MAIN_ROUTE}/getone/1`)
    .send({ index: 1 })
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.objname).toBe('Warrior Castle')
    })
})

test('get all powerup', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/getall`)
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(powerup.item.length)
    })
})