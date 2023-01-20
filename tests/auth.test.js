const request = require('supertest')
const app = require('../src/app')
var db = require('../knexfile')
const MAIN_ROUTE = '/acc'

let fake_user1 = {
  name: 'testName',
  email: 'test@test.com',
  password: '123',
  balance: 0,
  outDate: new Date('2021-03-25'),
  inDate: new Date('2021-03-26'),
  sumMultiplier: 2
}


test('email must be unique', () => {
  return request(app)
    .post(`${MAIN_ROUTE}/signup`)
    .send(fake_user1)
    .then(res => {
    })
})