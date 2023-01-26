module.exports = {
  test: {
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
}


// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
var knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'nodegamedb',
    user: 'postgres',
    password: '123456'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/migrations'
  }
});

module.exports = knex;