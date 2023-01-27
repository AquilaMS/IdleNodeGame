var db = require('../config/database')
const userServices = require('../services/users')
const powerupList = require('./powerupslist')


const getOne = async (req, res) => {
  return powerupList.item[req.index];
}
const getAll = async (req, res) => {
  return powerupList.item;
}

const buyPowerup = async (user, pwup) => {

  if (pwup > powerupList.item.length - 1) return { error: 'Invalid range' }

  const userData = await userServices.getUserData(user)
  const oldBalance = userData.balance
  const price = powerupList.item[pwup].price
  newBalance = oldBalance - price
  if (newBalance < 0) return { error: 'Insuficient balance' }
  const insertedTransaction = await db('transactions').insert({
    id_user: user.id,
    id_powerup: pwup,
    name: powerupList.item[pwup].objname,
    price: powerupList.item[pwup].price,
    multiplier: powerupList.item[pwup].multiplier
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