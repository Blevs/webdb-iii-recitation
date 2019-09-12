
exports.up = function(knex) {
  return knex.schema
    .createTable('owners', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable();
      tbl
        .string('email')
        .unique()
        .notNullable();
    })
    .createTable('species', tbl => {
      tbl.increments();
      tbl
        .string('specie')
        .notNullable()
        .unique();
    })
    .createTable('pets', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable();
      tbl
        .integer('age')
        .unsigned()
        .notNullable();
      tbl
        .integer('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('owners')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.text('care_instructions');
      tbl
        .integer('species_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('species');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('pets')
    .dropTableIfExists('owners')
    .dropTableIfExists('species');
};
