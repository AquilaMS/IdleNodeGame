var db = require('../../knexfile')
const userServices = require('../services/users')

const powerupList = [
  { objname: 'Alchemy Lab', price: 10, multiplier: 2 },
  { objname: 'Warrior Castle', price: 20, multiplier: 3 },
  { objname: 'Archery Camp', price: 30, multiplier: 4 }
]
const getOne = async (req, res) => {
  return powerupList[req.index];
}
const getAll = async (req, res) => {
  return powerupList;
}

const buyPowerup = async (user, pwup) => {
  const userData = await userServices.getUserData(user)
  const oldBalance = userData.balance
  const price = powerupList[pwup].price
  newBalance = oldBalance - price
  if (newBalance < 0) return { error: 'Insuficient balance' }
  const insertedTransaction = await db('transactions').insert({
    id_user: user.id,
    id_powerup: pwup,
    name: powerupList[pwup].objname,
    price: powerupList[pwup].price,
    multiplier: powerupList[pwup].multiplier
  })

  return insertedTransaction
}

const updateMultiplier = async (user, pwup) => {
  const userData = await userServices.getUserData(user)
  const sumMultiplier = db('transactions').where({ id_user: user.id }).sum('multiplier').first().returning(['sum'])
  return sumMultiplier
}
module.exports = {
  getAll,
  getOne,
  powerupList,
  buyPowerup,
  updateMultiplier
}