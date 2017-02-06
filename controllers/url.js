'use strict';

var UrlService = require('../services/url');

//resume to fullurl
exports.resume = function(req, res) {
    var tinyuri = req.params.tinyuri;
    UrlService.find(tinyuri)
        .then(function(link) {
            if (link == null)
                res.status(400).send("No Such FullUrl")
            else
                res.status(302).redirect(link.fullurl);

        })
        .catch(function(err) {
            res.status(400).send(err.toString());
        });
};

exports.add = function(req, res) {
    var _fullurl;
    var _link = req.body;
    var checkHttp = /^http(s)?\:\/\//;
    if (checkHttp.test(_link.fullurl))
        _fullurl = _link.fullurl;
    else
        _fullurl = "http://" + _link.fullurl;
    var link = {
        tinyuri: _link.tinyuri,
        fullurl: _fullurl,
        intro: _link.intro
    };
    UrlService.find(link.tinyuri)
        .then(function(url) {
            if (url == null)
                return UrlService.add(link)
            else
                res.status(400).send("The tinyuri has been used");

        })
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(err) {
            res.status(400).send(err.toString());
        })
};

exports.delete = function(req, res) {
    UrlService.delete(req.params.id)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(err) {
            res.status(400).send(err.toString());
        });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var _fullurl;
    var _link = req.body;
    var checkHttp = /^http(s)?\:\/\//;
    if (checkHttp.test(_link.fullurl))
        _fullurl = _link.fullurl;
    else
        _fullurl = "http://" + _link.fullurl;
    var link = {
        tinyuri: _link.tinyuri,
        fullurl: _fullurl,
        intro: _link.intro
    };
    UrlService.update(id, link)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(err) {
            res.status(400).send(err.toString());
        });
};