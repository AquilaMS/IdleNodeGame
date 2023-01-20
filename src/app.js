const app = require('express')();
const express = require('express')
const powerupsRouter = require('./routes/powerups')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.params)
  res.status(200).send();
});

app.use('/powerups', powerupsRouter)
app.use('/user', usersRouter)
app.use('/acc', authRouter)

module.exports = app;