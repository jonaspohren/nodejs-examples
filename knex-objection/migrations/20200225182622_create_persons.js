exports.up = function(knex) {
  return knex.schema
    .createTable('persons', (table) => {
      table.increments('id')
      table.string('name', 255)
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('persons')
};
