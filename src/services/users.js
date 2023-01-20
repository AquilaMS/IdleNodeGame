var db = require('../../knexfile')

const userData = {
  name: this.name,
  balance: this.balance,
  outDate: this.outdate,
  inDate: this.indate,
  sumMultiplier: this.sumMultiplier
}

const getUserData = async (req) => {
  return req
}

const updateBalance = async (req) => {

  const indate = new Date(req.inDate).getTime()
  const outdate = new Date(req.outDate).getTime()
  const diffdate = indate - outdate
  const timeOff = (diffdate / (1000) * req.sumMultiplier);
  const newBalance = req.balance + timeOff
  return newBalance
}

const buyPowerup = async (req) => {
  const oldBalance = req.user.balance
  const price = req.powerup.price
  newBalance = oldBalance - price
  if (newBalance < 0) return { error: 'Insuficient balance' }
  const newMultiplier = await addMultiplier(req.user, req.powerup)
  console.log(newMultiplier)
  return {
    newBalance: newBalance,
    newMultiplier: newMultiplier
  }
}

const addMultiplier = async (user, pwup) => {
  return user.sumMultiplier + pwup.multiplier
}

module.exports = {
  getUserData,
  updateBalance,
  buyPowerup
}