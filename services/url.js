var Url = require('../model').Url;

exports.find = function(tinyuri) {
    return Url.findOne({ tinyuri: tinyuri });
};

exports.add = function(url) {
    return new Url(url).save();
};

exports.delete = function(id) {
    return Url.findByIdAndRemove(id);
};

exports.update = function(id, url) {
    return Url.findByIdAndUpdate(id, url);
};

exports.fetch = function() {
    return Url.find({});
};