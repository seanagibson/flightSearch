var express = require('express');
var flightSearch = require('./flightSearch');
var app = express();

app.set('port', process.env.PORT || 3000);

app.param('departId', function(req, res, next, departId){
  req.depart = departId;
});

app.param('destId', function(req, res, next, destId){
  req.destination = destId;
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/depart/:departId/dest/:destId', function(req, res){
  var flightResults = {};
  flightResults = flightSearch.searchResults(req.depart, req.destination);
  res.json(flightResults);
});

app.listen(port);
