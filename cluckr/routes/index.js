var express = require('express');
var router = express.Router();
const knex = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('clucks'/*, { title: 'Express' }*/);
});

router.get('/sign_in', (req,res) => {
  res.render('sign_in');
});

router.get('/sign_out', (req,res) => {
  res.render('sign_out');
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
// HTTP VERB: POST, PATH: /sign_in
router.post('/sign_in', (req, res) => {
  const username = req.body.username;

  if (username) {
    // To create a cookie, use the method `cookie` from the response
    // object. This method takes two required arguments: a name for
    // the cookie and a value. It takes an option third argument
    // which is object to configure the cookie. Here we use
    // it to set an expiration time on the cookie.
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE});

    // When using this method, cookieParser will create a header
    // in the response to set the cookie which might look like this:
    // Set-Cookie:username=jonsnow; Max-Age=604800; Path=/; Expires=Thu,08 Feb 2018 18:55:50 GMT
  }

  res.redirect('/clucks');
});

router.get('/new', (req,res) => {
  res.render('new');
})

router.post('/new', (req,res) => {
  // res.render('new');
  const content = req.body.content;
  const image_url = req.body.image_url;
  const username = req.cookies.username;

  knex
  .insert({
    content: content,
    image_url: image_url,
    username: username
  })
  .into('clucks')
  .then(() => {
    // Database queries with knex are asynchronous like
    // setTimeout and setInterval. If you want to write
    // ANY CODE that depends on results from a query, you
    // must do it inside of the callback for `then`.
    res.redirect('/clucks');
  });
})

router.post('/', (req, res) => {
});

router.post('/sign_out', (req, res) => {
  res.clearCookie('username');
  res.redirect('/sign_out');
});

module.exports = router;
