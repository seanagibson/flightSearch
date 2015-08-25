var data = require('./data.json');
var GraphSearch = require('./graph-search');


function FlightSearch(){
  var graphSearch = new GraphSearch();

  var checkAirport = function(airportId){
    if(data.airports.map(function(airport){return airport.airportId}).indexOf(airportId) === -1){
      return false;
    } else {
      return true;
    }
  };

  var getItinerary = function(departAirportId, destinationAirportId, searchMethod){
    graphSearch.addVertices(searchMethod);
    var itinerary = [];
    itinerary = graphSearch.getShortestPath(departAirportId, destinationAirportId);
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

  var getResults = function(depart, dest, searchMethods){
    var resultObj = {};

    resultObj.searchMethod = searchMethods;
    resultObj.itinerary = getItinerary(depart, dest, searchMethods);
    resultObj.cost = getFlightCost(resultObj.itinerary);
    resultObj.miles = getFlightMiles(resultObj.itinerary);
    resultObj.duration = getFlightDuration(resultObj.itinerary);

    return resultObj;

  };

  this.searchResults = function(depart, destination){
    var searchMethods = ['cost', 'miles', 'duration'];
    var flightResultsArray = [];

    //check that depart and destination are in data set
    if(!checkAirport(depart) || !checkAirport(destination)){
      return null;
    } else {
      searchMethods.forEach(function(method){
        flightResultsArray.push(getResults(depart, destination, method));
      });
      return flightResultsArray;
    }
  };
}

module.exports = FlightSearch;
