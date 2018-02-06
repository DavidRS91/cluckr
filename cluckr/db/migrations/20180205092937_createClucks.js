
exports.up = function(knex) {
  return knex.schema
  .createTable('clucks', table => {
    table.increments('id');
    table.string('username'); //creates a column 'username' with type string
    table.text('content');
    table.string('image_url');
    table.timestamps(false,true); //Creates two columns, created_at and updated_at
    //note: getting updated_at to update requires significantly more sql
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('clucks')
};
