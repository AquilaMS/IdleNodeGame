const request = require('supertest')
const app = require('../src/app')
const fakeUsers = require('./fakeusers')
const authServices = require('../src/services/auth')
const jwt = require('jwt-simple')
var db = require('../knexfile')

const MAIN_ROUTE = '/user'
const SECRET = 'super hyper secret'
const SIGNUP_ROUTE = '/signup'
const AUTH_ROUTE = '/acc'
const POWERUPS_ROUTE = '/powerups'

beforeAll(async () => {
  const res = await authServices.createUser(fakeUsers.fake_user3)
  user1 = { ...res }
  user1.token = jwt.encode(user1.insertedUser[0], SECRET)

  const res2 = await authServices.createUser(fakeUsers.fake_user3)
  user2 = { ...res2 }
})

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
test('.', () => { })