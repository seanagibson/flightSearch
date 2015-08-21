var data = require('./data.json');
var Graph = require('node-dijkstra');


function GraphSearch() {
  var graph = new Graph();

  this.addVertices = function(method){
    data.airports.forEach(function(airport){
        var connectionObj = {};
        airport.connections.forEach(function(connection){
          connectionObj[connection.airportId] = connection[method];
        });
        graph.addVertex(airport.airportId, connectionObj);
    });
  }

  this.getShortestPath = function(departAirportId, destAirportId){
    return graph.shortestPath(departAirportId, destAirportId);
  }
}

module.exports = GraphSearch;
