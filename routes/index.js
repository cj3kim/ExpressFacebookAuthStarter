var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/facebook', function (req, res, next) {
  res.render('facebook');
});

router.post('/store-access-token', function(req, res, next) {
  var body = req.body
  console.log(body);
});

module.exports = router;
module.exports = router;
