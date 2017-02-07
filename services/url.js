var Url = require('../model').Url;

exports.find = function(alias) {
    return Url.findOne({ alias: alias });
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