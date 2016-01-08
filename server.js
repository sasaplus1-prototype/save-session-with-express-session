'use strict';

process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err);

  process.exit(1);
});

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: process.env.SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.post('/', function(req, res) {
  console.log('POST =====');
  console.log('body: %j', req.body);
  console.log('session: %j', req.session);
  console.log('==========');

  req.session.value = req.body.value;
  res.redirect('/');
});

app.get('/', function(req, res) {
  console.log('GET ------');
  console.log('session-id: %s', req.session.id);
  console.log('session: %j', req.session);
  console.log('----------');

  res.render('index', {
    value: req.session.value || null
  });
});

app.listen(3000, function() {
  console.log('server starting at 127.0.0.1:3000');
});
