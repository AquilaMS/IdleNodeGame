var db = require('../../knexfile')

const createUser = async (req) => {
  const aaa = await db.insert(req).into('users').then(result => {
    console.log(result)
  }).catch(err => {
    return { error: 'Invalid' }
  })
  return aaa
}



module.exports = {
  createUser,
}