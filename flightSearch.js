var data = require('./data.json');
var Graph = require('node-dijkstra');

var graph = new Graph();

data.airports.forEach(function(airport){
  graph.addVertex(airport.airportId, function(){
    var connectionObj = {};
    airport.connections.forEach(function(connection){
      connectionObj[connection.airportId] = connection.cost;
    });
    return connectionObj;
  });
});

var getItinerary = function(departAirportId, destinationAirportId){
  var itinerary = [];
  itinerary = graph.shortestPath(departAirportId, destinationAirportId);
  return itinerary;
};

var getFlightCost = function(itineraryArray){
  var flightCost;

  for(var airportCount = 0; airportCount < itineraryArray.length - 1; airportCount++){
    var departIndex = data.airports.map(function(airport){return airport.airportId}).indexOf(itineraryArray[airportCount]);
    var destinationIndex = data.airports.connections.map(function(airport){return airport.airportId}).indexOf(itineraryArray[airportCount + 1]);
    flightCost += findFlightCost(departIndex, destinationIndex);
  }
  return flightCost;
};

var findFlightCost = function(departIndex, destinationIndex){
  return data.airports[departIndex].connections[destinationIndex].cost;
};

var searchResults = function(depart, destination){
  var flightResultsObj = {};
  flightResultsObj.itinerary = getItinerary(depart, destination);
  flightResultsObj.cost = getFlightCost(flightResultsObj.itinerary);
  return flightResultsObj;
};

module.exports = searchResults;
