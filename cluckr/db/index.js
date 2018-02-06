const knexfile = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexfile[environment]);
//☝🏻 knex package exports a function

module.exports = knex;
