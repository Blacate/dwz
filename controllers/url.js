'use strict';

var UrlService = require('../services/url');

//resume to fullurl
exports.resume = function(req, res) {
    var alias = req.params.alias;
    UrlService.find(alias)
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
        alias: _link.tinyurl,
        fullurl: _fullurl,
        intro: _link.intro
    };
    UrlService.find(link.alias)
        .then(function(url) {
            if (url == null)
                return UrlService.add(link)
            else
                res.status(400).send("The alias has been used");

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
        alias: _link.alias,
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
    var alias = req.body.tinyurl;
    if (alias == "api") {
        res.send({ unique: false });
    } else {
        UrlService.find(alias)
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