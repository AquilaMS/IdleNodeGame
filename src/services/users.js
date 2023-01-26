var db = require('../config/database')
const app = require('../app')
const powerupServices = require('../services/powerups')

const getUserData = async (user) => {
  const userData = await db('users').where({ id: user.id }).first()
  return userData
}

const updateBalance = async (user) => {
  try {
    const userData = await db('users').where({ id: user.id }).first()
    if (userData.outDate == null) userData.outDate = Date.now()
    const nowDate = new Date(Date.now())

    const oldBalance = userData.balance
    const outDate = new Date(userData.outDate).getTime()
    const inDate = new Date(userData.inDate).getTime()

    const dateDifference = Math.abs((inDate - outDate) / 1000)
    const multiplier = userData.sumMultiplier
    const newBalance = oldBalance + (dateDifference * multiplier)

    const newOutDate = userData.inDate
    const newInDate = nowDate.toISOString()

    const queryBalance = await db('users').update({
      balance: newBalance,
      inDate: newInDate,
      outDate: newOutDate
    }).where({ id: user.id }).returning(['balance', 'inDate', 'outDate'])

    const result = queryBalance[0]
    return { multiplier, newOutDate, newInDate, newBalance, dateDifference, result }
  }
  catch (err) {
    console.log(err)
  }
}

const updateOutDate = async (user) => {
  const nowDate = new Date(Date.now())
  const result = await db('users').where({ id: user.id }).update({ outDate: nowDate.toISOString() })
  return result
}

const updateInDate = async (user) => {
  const nowDate = new Date(Date.now())
  await db('users').where({ id: user.id }).update({ inDate: nowDate.toISOString() })
}


module.exports = {
  updateBalance,
  getUserData,
  updateInDate,
  updateOutDate
}