var express = require('express');
var router = express.Router();
var urlController = require('../controllers/url');
var pageController = require('../controllers/page');

router.get('/', pageController.index);

router.get('/:alias', urlController.resume);

module.exports = router;