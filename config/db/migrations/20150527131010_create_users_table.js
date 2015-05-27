
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments().primary();
    t.string('full_name');
    t.string('email');
    t.string('fb_access_token');

    t.string('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.string('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
