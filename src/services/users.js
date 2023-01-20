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
  const timeOff = (diffdate / (1000));

  const newBalance = req.balance + (timeOff * req.sumMultiplier)

  return newBalance
}

module.exports = {
  getUserData,
  updateBalance
}