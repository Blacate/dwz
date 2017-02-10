var config = require('../config');

exports.index = function(req, res) {
    res.render('index', {
        siteName: config.siteName,
        owner: config.owner
    });
};