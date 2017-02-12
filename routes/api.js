var express = require('express');
var router = express.Router();
var urlController = require('../controllers/url');
var userController = require('../controllers/user');
var Util = require('../util');

router.get('/', function(req, res) {
    res.send({
        "add link": {
            "POST": "/api/add",
            "body": {
                "tinyurl": "bd",
                "fullurl": "https://www.baidu.com",
                "intro": "百度"
            }
        },
        "check unique": {
            "POST": "/api/check",
            "body": {
                "tinyurl": "bd"
            }
        },
        "login": {
            "POST": "/api/login",
            "body": {
                "username": "username",
                "password": "password"
            }
        },
        "update link": {
            "PUT": "/api/update/:id",
            "body": {
                "tinyurl": "bd",
                "fullurl": "https://www.baidu.com",
                "intro": "百度"
            }
        },
        "delete link": {
            "DELETE": "/api/delete/:id"
        },
        "get all links": {
            "GET": "/api/links"
        }
    })
});

router.get('/links', Util.checkLogin, urlController.fetch);

router.post('/add', urlController.add);

router.delete('/delete/:id', Util.checkLogin, urlController.delete);

router.put('/update/:id', Util.checkLogin, urlController.update);

router.post('/check', urlController.check);

router.post('/login', Util.checkNotLogin, userController.login);

module.exports = router;