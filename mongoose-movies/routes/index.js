var express = require('express');
var router = express.Router();

const celebritiesRouter = require('./celebrities');

//  * '/celebrity'
router.use('/celebrities', celebritiesRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
