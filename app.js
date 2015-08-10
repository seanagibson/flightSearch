var express = require('express');
var flightSearch = require('./flightSearch');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/search', function(req, res){
  var flightResults = {};
  var depart = req.query.departId;
  var destination = req.query.destId;

  flightResults = flightSearch(depart, destination);

  if(flightResults.itinerary.length === 0){
    res.status(500);
    res.render('error', 'Error: Could not locate airports');
  } else {
    res.json(flightResults);
  }
});

app.listen(app.get('port'));
