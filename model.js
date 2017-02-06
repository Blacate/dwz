var mongoose = require('mongoose');
var config = require('./config');
mongoose.Promise = require('promise');

var connection = mongoose.createConnection(config.mongodb);
var Url = connection.model('url', require('./schemas/url'));

module.exports = {
    Url
};