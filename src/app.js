const app = require('express')();
const express = require('express')
const powerupsRouter = require('./routes/powerups')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth');
const passportConfig = require('./config/passport')()
const signupRouter = require('./routes/signup')
const signinRouter = require('./routes/signin')
const knexfile = require('../knexfile')
const knex = require('knex')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log(req.params)
  res.status(200).send();
});

app.use('/powerups', passportConfig.authenticate(), powerupsRouter)
app.use('/user', passportConfig.authenticate(), usersRouter)
app.use('/acc', passportConfig.authenticate(), authRouter)
app.use('/signup', signupRouter)
app.use('/signin', signinRouter)
//app.use('/acc', passport.authenticate('local'), authRouter)
module.exports = app;