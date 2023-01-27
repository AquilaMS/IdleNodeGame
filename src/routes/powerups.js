const app = require('express')
const router = app.Router()
const powerup = require('../services/powerups')

router
  .post('/getone/:id', getOne = (req, res, next) => {
    powerup.getOne(req.params.id).then(result => {
      res.status(200).json(result)
    })
  })

  .get('/getall', getAll = (req, res, next) => {
    powerup.getAll().then(result => {
      res.status(200).json(result)
    })
  })

  .post('/buy/:powerupID', buyPowerup = (req, res, next) => {
    powerup.buyPowerup(req.user, req.params.powerupID).then(result => {
      res.status(201).json(result)
    })
  })

module.exports = router