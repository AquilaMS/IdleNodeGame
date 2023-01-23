const request = require('supertest')
const app = require('../src/app')
var db = require('../knexfile')
const MAIN_ROUTE = '/acc'
const fakeUsers = require('./fakeusers')
const authServices = require('../src/services/auth')


test('email must be unique', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/get`)
    .send({ id: 44 })
    .then(res => {
      expect(res.status).toBe(200)
    })
})

test('check fields', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/signup`)
    .send({})
    .then(res => {
      expect(res.body).toHaveProperty('error')
    })
})

test('insert a user', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/signup`)
    .send(fakeUsers.fake_user3)
    .then(res => {
      expect(res.status).toBe(201)
    })
})

test('get bad password', () => {
  return authServices.createUser(fakeUsers.fake_user3)
    .then(() => request(app).post('/acc/signin')
      .send({ email: fakeUsers.fake_user3.email, password: '1234' }))
    .then(res => {
      expect(res.status).toBe(300)
      expect(res.body).toHaveProperty('error')
    })
})

test('get good password', () => {
  return authServices.createUser(fakeUsers.fake_user3)
    .then(() => request(app).post('/acc/signin')
      .send({ email: fakeUsers.fake_user3.email, password: '123' }))
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('token')
    })
})

