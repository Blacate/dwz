var express = require('express');
var router = express.Router();
var url = require('../controllers/url');

router.get('/', function(req, res) {
    res.send('admin page');
});

router.get('/:tinyuri', url.resume);

module.exports = router;