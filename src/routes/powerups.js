const app = require('express')
const router = app.Router()
const powerup = require('../services/powerups')

router.post('/', getOne = (req, res, next) => {
  powerup.getOne(req.body).then(result => {
    res.status(200).json(result)
  })
})

router.get('/', getAll = (req, res, next) => {
  powerup.getAll().then(result => {
    res.status(200).json(result)
  })
})

router.post('/buy/:powerupID', buyPowerup = (req, res, next) => {
  powerup.buyPowerup(req.user, req.params.powerupID).then(result => {
    res.status(200).json(result)
  })
})

router.get('/update', updateMultiplier = (req, res, next) => {
  powerup.updateMultiplier(req.user).then(result => {
    res.status(200).json(result)
  })
})

module.exports = router