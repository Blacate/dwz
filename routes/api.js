var express = require('express');
var router = express.Router();
var urlController = require('../controllers/url');

router.get('/', function(req, res) {
    res.send('dwz api')
});

router.post('/add', urlController.add);

router.delete('/delete/:id', urlController.delete);

router.put('/update/:id', urlController.update);

module.exports = router;