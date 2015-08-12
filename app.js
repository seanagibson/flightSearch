var express = require('express');
var FlightSearch = require('./flightSearch');
var AirportData = require('./airportdata');
var app = express();
var flightSearch = new FlightSearch();
var airportData = new AirportData();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/airports', function(req, res){
  var airportArray = [];
  airportArray = airportData.getAirports();
  res.json(airportArray);
});

app.get('/search', function(req, res){
  var flightResults = {};
  var depart = req.query.departId;
  var destination = req.query.destId;

  flightResults = flightSearch.searchResults(depart, destination);

  if(flightResults.itinerary.length === 0){
    res.status(500);
    res.render('error', 'Internal Error');
  } else {
    res.json(flightResults);
  }
});

app.listen(app.get('port'));
