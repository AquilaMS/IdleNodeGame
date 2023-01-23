var db = require('../../knexfile')
const bcrypt = require('bcrypt')
const SECRET = 'super hyper secret'
const jwt = require('jwt-simple')

const getPasswordHash = (pwd) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(pwd, salt)
}
const createUser = async (req) => {
  if (!req.name) return { error: 'Insert a name' }
  if (!req.email) return { error: 'Insert a email' }
  if (!req.password) return { error: 'Insert a password' }

  req.password = getPasswordHash(req.password)
  const newUser = await db.insert(req).into('users').then(result => {
  }).catch(err => {
    return { error: 'Invalid' }
  })
  return { newUser }
}

const getUserData = async (filter = {}) => {
  const res = await db.select().table('users').where(filter).first()
  //console.log(res)
  return res
}

const signIn = async (req) => {
  return getUserData({ email: req.email })
    .then(user => {
      console.log(user)
      console.log(req)
      if (bcrypt.compareSync(req.password, user.password)) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        }
        const token = jwt.encode(payload, SECRET)
        return token
      }
      else {
        return { error: 'Invalid user' }
      }
    }).catch(error => {
      console.log(error)
    })
}
module.exports = {
  createUser,
  getUserData,
  signIn
}