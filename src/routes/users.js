const app = require('express')
const router = app.Router()
const userServices = require('../services/users')

router.post('/', getUserData = async (req, res, next) => {
  userServices.getUserData(req.body).then(result => {
    res.status(200).json(result)
  })
})

router.post('/update', updateBalance = async (req, res, next) => {
  userServices.updateBalance(req.body).then(result => {
    res.status(200).json(result)
  })
})


module.exports = router