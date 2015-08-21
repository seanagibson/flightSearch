var assert = require('assert');
var FlightSearch = require('../flightSearch.js');
var flightSearch = new FlightSearch();

describe('Flight search results method', function(){
  it('should return an array of 3 objects', function(){
    var results = flightSearch.searchResults('SFO', 'DFW');
    assert.equal(results.length, 3);
    assert.equal(results[0].searchMethod, 'cost');
    assert.equal(results[1].searchMethod, 'miles');
    assert.equal(results[2].searchMethod, 'duration');
  });
  it('should return the three flight costs', function(){
    var results = flightSearch.searchResults('SFO', 'DFW');
    assert.equal(results[0].cost, 324);
    assert.equal(results[1].cost, 350);
    assert.equal(results[2].cost, 350);
  });
  it('should return the three flight miles', function(){
    var results = flightSearch.searchResults('SFO', 'DFW');
    assert.equal(results[0].miles, 1572);
    assert.equal(results[1].miles, 1464);
    assert.equal(results[2].miles, 1464);
  });
  it('should return the three flight durations', function(){
    var results = flightSearch.searchResults('SFO', 'DFW');
    assert.equal(results[0].duration, 4.5);
    assert.equal(results[1].duration, 4);
    assert.equal(results[2].duration, 4);
  });
});
