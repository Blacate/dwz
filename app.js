var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var port = config.bindPort || 3000;
var index = require('./routes/index');
var api = require('./routes/api');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);

//handle 404
app.use(function(req, res) {
    res.status(404).send('404 Not Found');
});

//handle error
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send(err.message);
});

//listen port
app.listen(port, function() {
    console.log('dwz start at : ' + port);
});