const app = require('express')
const router = app.Router()
const userServices = require('../services/users')

router
  .post('/update', updateBalance = async (req, res, next) => {
    userServices.updateBalance(req.user).then(result => {
      res.status(200).json(result)
    })
  })
module.exports = router