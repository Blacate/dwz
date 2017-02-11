var config = require('../config');

exports.login = function(req, res) {
    var userInfo = req.body;
    if (userInfo.username == config.loginInfo.username && userInfo.password == config.loginInfo.password) {
        req.session.user = userInfo;
        res.sendStatus(204);
    } else
        res.sendStatus(400);
};