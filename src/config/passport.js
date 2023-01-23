const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const db = require('../../knexfile')

const customFields = {
  email: 'test@test.com',
  password: '123'
}

const verifyCallback = (email, password, done) => {
  return db('users').where({ email, password })
}
const strategy = new localStrategy(customFields, verifyCallback)
passport.use(strategy)