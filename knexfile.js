module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'nodegamedb',
    user: 'postgres',
    password: '123456'
  },
  migrations: {
    directory: 'src/migrations'
  }
}