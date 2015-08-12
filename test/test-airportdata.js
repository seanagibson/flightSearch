var assert = require('assert');
var AirportData = require('../airportdata.js');
var airportData = new AirportData();

describe('AirportData method', function(){
  it('should return an array of airports', function(){
    var resultsArray = airportData.getAirports();
    assert.equal(resultsArray.length, 7);
    assert.equal(resultsArray[0].airportId, 'SFO');
    assert.equal(resultsArray[0].city, 'San Francisco');
  });
});
