var db = require('../config/database')
const app = require('../app')
const powerupServices = require('../services/powerups')

const userData = {
  name: this.name,
  balance: this.balance,
  outDate: this.outdate,
  inDate: this.indate,
  sumMultiplier: this.sumMultiplier
}

const getUserData = async (user) => {
  const userData = await db('users').where({ id: user.id }).first()
  return userData
}

const updateBalance = async (user) => {
  //const userData = await getUserData(user)
  const sumMultiplier = await powerupServices.updateMultiplier(user)
  const newBalance = await db('users').where({ id: user.id }).update({ balance: user.balance })
  return newBalance
}

const addMultiplier = async (user, pwup) => {
  return user.sumMultiplier + pwup.multiplier
}

module.exports = {
  updateBalance,
  getUserData
}