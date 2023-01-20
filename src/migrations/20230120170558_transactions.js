/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (t) => {
    t.increments('id').primary();
    t.integer('id_user')
      .references('id')
      .inTable('users')
      .notNullable()
    t.integer('id_powerup')
    t.string('name')
    t.integer('price')
    t.decimal('multiplier', 20, 2)
  }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
