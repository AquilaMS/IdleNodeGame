const app = require('express')
const router = app.Router()
const authServices = require('../services/auth')

router
  .post('/get', getUserData = async (req, res, next) => {
    authServices.getUserData(req.user).then(result => {
      if (result && result.error) return res.status(400).json({ error: result.error })
      return res.status(200).json(result)
    })
  })

module.exports = router