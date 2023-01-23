const app = require('express')
const router = app.Router()
const authServices = require('../services/auth')

router
  .post('/signup', createUser = async (req, res, next) => {
    authServices.createUser(req.body).then(result => {
      if (!result.error) return res.status(201).json(result)
      return res.status(300).json({ error: 'Invalid' })
      //TODO: checar erro
    })
  })

  .post('/get', getUserData = async (req, res, next) => {
    authServices.getUserData(req.body).then(result => {
      if (!result.error) return res.status(200).json(result)
      return res.status(300).json({ error: 'Invalid' })

    })
  })

  .post('/signin', signIn = async (req, res, next) => {
    authServices.signIn(req.body).then(result => {
      if (!result.error) return res.status(201).json({ token: result })
      return res.status(300).json({ error: 'Invalid' })
    })
  })

module.exports = router