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

module.exports = {
  getAll,
  getOne,
  powerupList,
}