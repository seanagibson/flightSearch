var data = require('./data.json');
var Graph = require('node-dijkstra');

var graph = new Graph();

var setGraph = function(){
  data.airports.forEach(function(airport){
      var connectionObj = {};
      airport.connections.forEach(function(connection){
        connectionObj[connection.airportId] = connection.cost;
      });
      graph.addVertex(airport.airportId, connectionObj);
  });
};

var checkAirport = function(airportId){
  if(data.airports.map(function(airport){return airport.airportId}).indexOf(airportId) === -1){
    return false;
  } else {
    return true;
  }
};

var getItinerary = function(departAirportId, destinationAirportId){
  var itinerary = [];

  itinerary = graph.shortestPath(departAirportId, destinationAirportId);
  return itinerary;
};

var getDepartAirportIndex = function(airportId){
  return data.airports.map(function(airport){return airport.airportId}).indexOf(airportId);
};

var getDestinationAirportIndex = function(destId, departIndex){
  if(departIndex === -1){
    return -1;
  } else {
  return data.airports[departIndex].connections.map(function(airport){return airport.airportId}).indexOf(destId);
  }
};

var getFlightCost = function(itinerary){
  var flightCost = 0;

  for(var airportCount = 0; airportCount < itinerary.length - 1; airportCount++){
    var departIndex = getDepartAirportIndex(itinerary[airportCount]);
    var destinationIndex = getDestinationAirportIndex(itinerary[airportCount + 1], departIndex);

    flightCost += findFlightCost(departIndex, destinationIndex);
  }
  return flightCost;
};

var findFlightCost = function(departIndex, destinationIndex){
  return data.airports[departIndex].connections[destinationIndex].cost;
};

var getFlightMiles = function(itinerary){
  var flightMiles = 0;

  for(var airportCount = 0; airportCount < itinerary.length - 1; airportCount++){
    var departIndex = getDepartAirportIndex(itinerary[airportCount]);
    var destinationIndex = getDestinationAirportIndex(itinerary[airportCount + 1], departIndex);

    flightMiles += findFlightMiles(departIndex, destinationIndex);
  }
  return flightMiles;
};

var findFlightMiles = function(departIndex, destinationIndex){
  return data.airports[departIndex].connections[destinationIndex].miles;
};

var getFlightDuration = function(itinerary){
  var flightDuration = 0;

  for(var airportCount = 0; airportCount < itinerary.length - 1; airportCount++){
    var departIndex = getDepartAirportIndex(itinerary[airportCount]);
    var destinationIndex = getDestinationAirportIndex(itinerary[airportCount + 1], departIndex);

    flightDuration += findFlightDuration(departIndex, destinationIndex);
  }
  return flightDuration;
};

var findFlightDuration = function(departIndex, destinationIndex){
  return data.airports[departIndex].connections[destinationIndex].duration;
};

var searchResults = function(depart, destination){
  var flightResultsObj = {};
  setGraph();

  //check that depart and destination are in data set
  if(!checkAirport(depart) || !checkAirport(destination)){
    return flightResultsObj;
  } else {
    flightResultsObj.itinerary = getItinerary(depart, destination);
    flightResultsObj.cost = getFlightCost(flightResultsObj.itinerary);
    flightResultsObj.miles = getFlightMiles(flightResultsObj.itinerary);
    flightResultsObj.duration = getFlightDuration(flightResultsObj.itinerary);

    return flightResultsObj;
  }
};

module.exports = searchResults;
