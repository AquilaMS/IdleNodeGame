const app = require('express')
const router = app.Router()
const auth = require('../services/auth')


router.post('/signup', createUser = async (req, res, next) => {
  auth.createUser(req.body).then(result => {
    if (!result.error) res.status(201).json(result)
    return res.status(300).json({ error: 'Invalid' })

  })
})

module.exports = router