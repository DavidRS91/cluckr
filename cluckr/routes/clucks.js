var express = require('express');
var router = express.Router();
const knex = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex
  .select()
  .from('clucks')
  .orderBy('created_at', 'DESC')
  .then(clucks => {
    res.render('clucks', {clucks: clucks});
  });
});

router.get('/new', function(req, res, next) {
  res.render('clucks/new');
});

module.exports = router;
