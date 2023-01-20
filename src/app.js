const app = require('express')();
const express = require('express')

const powerupsRouter = require('./routes/powerups')
const usersRouter = require('./routes/users')

app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.params)
  res.status(200).send();
});

app.use('/powerups', powerupsRouter)
app.use('/user', usersRouter)

module.exports = app;