var assert = require('assert');
var FlightSearch = require('../flightSearch.js');
var flightSearch = new FlightSearch();

describe('Flight search results method', function(){
  it('should return an object containing the flight itinerary', function(){
    var results = flightSearch.searchResults('SFO', 'LAX');
    assert.equal(results.itinerary.length, 2);
    assert.equal(results.itinerary[0], 'SFO');
    assert.equal(results.itinerary[1], 'LAX');
  });
  it('should return the flight cost', function(){
    var results = flightSearch.searchResults('SFO', 'LAX');
    assert.equal(results.cost, 99);
  });
  it('should return the flight miles', function(){
    var results = flightSearch.searchResults('SFO', 'LAX');
    assert.equal(results.miles, 337);
  });
  it('should return the flight duration', function(){
    var results = flightSearch.searchResults('SFO', 'LAX');
    assert.equal(results.duration, 1.5);
  });
});
