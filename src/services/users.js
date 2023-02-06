var db = require('../config/database')

const getUserData = async (user) => {
  const userData = await db('users').where({ id: user.id }).first()
  return userData
}

const updateBalance = async (user) => {
  const userData = await db('users').where({ id: user.id }).first()

  if (userData.outDate == null) userData.outDate = new Date(Date.now()).getTime()
  const oldBalance = userData.balance
  const outDateTime = new Date(userData.outDate).getTime()
  const inDateTime = new Date(Date.now()).getTime()
  const timeDifference = (inDateTime - outDateTime) / 1000
  const newBalance = Math.round(((timeDifference * userData.sumMultiplier) / 5) + oldBalance).toFixed(0)

  const newUserData = await db('users').where({ id: user.id }).update({
    balance: newBalance,
    outDate: new Date(Date.now()).toISOString(),
    inDate: new Date(Date.now()).toISOString()
  }).returning(['balance', 'name', 'balance', 'sumMultiplier'])

  return newUserData[0]
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