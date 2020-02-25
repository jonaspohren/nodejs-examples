exports.up = function(knex) {
  return knex.schema
    .table('persons', (table) => {
      table.integer('age')
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('persons', (table) => {
      table.dropColumn('age')
    })
};
