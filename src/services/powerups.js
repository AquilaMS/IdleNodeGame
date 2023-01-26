var db = require('../config/database')
const app = require('../app');
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
  await db('users').where({ id: user.id }).update({ balance: newBalance })
  return updateMultiplier(user)
}

const updateMultiplier = async (user) => {
  const sumMultiplier = await db('transactions').where({ id_user: user.id }).sum('multiplier').first().returning(['sum'])
  const newUserMultiplier = await db('users').where({ id: user.id }).update({ sumMultiplier: sumMultiplier.sum }).returning(['sumMultiplier'])

  return newUserMultiplier[0].sumMultiplier
}
module.exports = {
  getAll,
  getOne,
  powerupList,
  buyPowerup,
  updateMultiplier
}