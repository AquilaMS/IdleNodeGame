const request = require('supertest')
const app = require('../src/app')
const powerup = require('../src/services/powerups')
const MAIN_ROUTE = '/powerups'

test('get one powerup', () => {
  return request(app)
    .post(`${MAIN_ROUTE}`)
    .send({ index: 1 })
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
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(powerup.powerupList.length)

    })
})