var express = require('express');
var router = express.Router();

//Controller modules
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var book_instance_controller = require('../controllers/bookinstanceController');
var genre_controller = require('../controller/genreController');
/* GET home page. */
router.get('/', book_controller.index);

router.get('/:object', function(req, res, next) {
  res.send('This');
});

module.exports = router;
