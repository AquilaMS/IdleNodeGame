const app = require('express')
const router = app.Router()
const authServices = require('../services/auth')

router
  .post('/', createUser = async (req, res, next) => {
    authServices.createUser(req.body).then(result => {
      if (result && result.error) return res.status(300).json({ error: result.error })
      return res.status(201).json(result)
    })
  })

module.exports = router