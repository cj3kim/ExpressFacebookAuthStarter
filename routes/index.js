var express = require('express');
var router = express.Router();

var env = process.env.NODE_ENV;
var dbConfig = require('../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/facebook', function (req, res, next) {
  res.render('facebook');
});


router.post('/store-access-token', function(req, res, next) {
  var body = req.body
  var accessToken = body.accessToken;

  knex.insert([{
    email: 'sample@gmail.com',
    fb_access_token: accessToken,
    full_name: 'sample name'
  }])
  .into('users')
  .returning('id')
  .then(function (row) {
    var id = row[0];
    var obj = { id: id };

    res.json(obj); //automatically will serialize into a json string for you. 
  }).catch(function (err) {
    console.log(err);
    res.json({err: err});
  });
});


router.get('/users', function (req, res, next) {
  knex.select("*").from('users')
    .then(function (rows) {
      var data = { users: rows };
      res.render('users', data);
    });
});


module.exports = router;
module.exports = router;
