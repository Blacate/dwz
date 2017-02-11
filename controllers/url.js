'use strict';

var UrlService = require('../services/url');

//resume to fullurl
exports.resume = function(req, res) {
    var tinyurl = req.params.tinyurl;
    UrlService.find(tinyurl)
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
        tinyurl: _link.tinyurl,
        fullurl: _fullurl,
        intro: _link.intro
    };
    UrlService.find(link.tinyurl)
        .then(function(url) {
            if (url == null)
                return UrlService.add(link)
            else
                res.status(400).send("The tinyurl has been used");

        })
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(err) {
            res.status(400).send(err.toString());
        });
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
        tinyurl: _link.tinyurl,
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

exports.check = function(req, res) {
    var tinyurl = req.body.tinyurl;
    if (tinyurl == "api") {
        res.send({ unique: false });
    } else {
        UrlService.find(tinyurl)
            .then(function(url) {
                if (url == null)
                    res.send({
                        unique: true
                    });
                else
                    res.send({
                        unique: false
                    });
            })
            .catch(function(err) {
                res.status(400).send(err.toString());
            });
    }
};

exports.fetch = function(req, res) {
    UrlService.fetch()
        .then(function(result) {
            res.send({
                links: result
            });
        })
        .catch(function(err) {
            res.status(400).send(err.toString());
        });
};