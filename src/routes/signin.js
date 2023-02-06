const app = require('express')
const router = app.Router()
const authServices = require('../services/auth')

router
  .post('/', signIn = async (req, res, next) => {
    authServices.signIn(req.body).then(result => {
      if (!result.error) return res.status(201).json({ name: result.name, token: result.token })
      return res.status(400).json({ error: result.error })
    })
  })

module.exports = router