const passport = require('passport')
const passportJwt = require('passport-jwt')
const authServices = require('../services/auth')

const SECRET = 'super hyper secret'

const { Strategy, ExtractJwt } = passportJwt

module.exports = () => {
  const params = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }
  const strategy = new Strategy(params, (payload, done) => {
    authServices.getUserData({ id: payload.id })
      .then(user => {
        if (user) done(null, { ...payload })
        else done(null, false)
      }).catch(error => {
        done(error, false)
      })
  })

  passport.use(strategy)

  return {
    authenticate: () => passport.authenticate('jwt', { session: false })
  }
}