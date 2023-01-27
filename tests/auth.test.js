const request = require('supertest')
const app = require('../src/app')
var db = require('../knexfile')
const fakeUsers = require('./fakeusers')
const authServices = require('../src/services/auth')
const jwt = require('jwt-simple')

const MAIN_ROUTE = '/acc'
const SIGNUP_ROUTE = '/signup'
const SECRET = 'super hyper secret'
const SIGNIN_ROUTE = '/signin'

beforeAll(async () => {
  const res = await authServices.createUser(fakeUsers.fake_user3)
  user = { ...res }
  user.token = jwt.encode(user.insertedUser[0], SECRET)
})

test('email must be unique', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/get`)
    .set('authorization', `bearer ${user.token}`)
    //.send({ id: 619 })
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('check fields', () => {
  return request(app)
    .post(`${SIGNUP_ROUTE}`)
    .send({})
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.body).toHaveProperty('error')
    })
})

test('insert a user', () => {
  return request(app)
    .post(`${SIGNUP_ROUTE}`)
    .send({ name: 'User test2', email: `${Date.now()}@mail.com`, password: '123' })
    .then(res => {
      expect(res.status).toBe(201)
    })
})

test('get bad password', () => {
  return authServices.createUser(fakeUsers.fake_user3)
    .then(() => request(app).post(SIGNIN_ROUTE)
      .send({ email: fakeUsers.fake_user3.email, password: '1234' })
      .set('authorization', `bearer ${user.token}`))
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
})

test('get good password', () => {
  return authServices.createUser(fakeUsers.fake_user3)
    .then(() => request(app).post(SIGNIN_ROUTE)
      .send({ email: fakeUsers.fake_user3.email, password: '123' })
      .set('authorization', `bearer ${user.token}`))
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('token')
    })
})

test('cannot access protected routes (users)', () => {
  return request(app)
    .post('/user')
    .then(res => {
      expect(res.status).toBe(401)
    })
})
test('cannot access protected routes (pwoerups)', () => {
  return request(app)
    .post('/powerups')
    .then(res => {
      expect(res.status).toBe(401)
    })
})