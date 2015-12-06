var express = require('express');
var FlightSearch = require('./flightSearch');
var AirportData = require('./airportdata');
var app = express();
var flightSearch = new FlightSearch();
var airportData = new AirportData();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use("/data", express.static(__dirname + '/views/data.html'));
app.use("/public", express.static(__dirname + '/public'));
app.use("/build", express.static(__dirname + '/build'));

app.get('/airports', function(req, res){
  var airportArray = [];
  airportArray = airportData.getAirports();
  res.json(airportArray);
});

app.get('/search', function(req, res){
  var flightResults = [];
  var depart = req.query.departId;
  var destination = req.query.destId;

  flightResults = flightSearch.searchResults(depart, destination);

  if(typeof flightResults === null){
    res.status(500);
    res.render('error', 'Internal Error');
  } else {
    res.json(flightResults);
  }
});

app.get('/data', function(req, res){
  res.sendFile('data.html');
});

app.listen(app.get('port'));
