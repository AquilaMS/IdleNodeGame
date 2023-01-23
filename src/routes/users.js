const app = require('express')
const router = app.Router()
const userServices = require('../services/users')


router.post('/update', updateBalance = async (req, res, next) => {
  userServices.updateBalance(req.body).then(result => {
    res.status(200).json(result)
  })
})

router.post('/buypowerup', buyPowerup = async (req, res, next) => {
  userServices.buyPowerup(req.body).then(result => {
    res.status(200).json(result)
  })
})

module.exports = router