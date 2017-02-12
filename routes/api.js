var express = require('express');
var router = express.Router();
var urlController = require('../controllers/url');
var userController = require('../controllers/user');
var Util = require('../util');

router.get('/', function(req, res) { res.send('dwz api') });

router.get('/links', Util.checkLogin, urlController.fetch);

router.post('/add', urlController.add);

router.delete('/delete/:id', Util.checkLogin, urlController.delete);

router.put('/update/:id', Util.checkLogin, urlController.update);

router.post('/check', urlController.check);

router.post('/login', Util.checkNotLogin, userController.login);

module.exports = router;