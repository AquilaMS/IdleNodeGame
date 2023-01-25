const app = require('express')
const router = app.Router()
const authServices = require('../services/auth')
const passportConfig = require('../config/passport')

router
  .post('/get', getUserData = async (req, res, next) => {
    authServices.getUserData(req.body).then(result => {
      if (result && result.error) return res.status(300).json({ error: result.error })
      return res.status(200).json(result)
    })
  })

  .post('/signin', signIn = async (req, res, next) => {
    authServices.signIn(req.body).then(result => {
      if (!result.error) return res.status(201).json({ token: result })
      return res.status(300).json({ error: 'Invalid' })
    })
  })

module.exports = router