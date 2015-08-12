var data = require('./data.json');

function AirportData() {
  this.getAirports = function(){
    var airportArray = [];
    data.airports.forEach(function(airport){
      airportArray.push({
        "airportId": airport.airportId,
        "city": airport.city
      });
    });
  return airportArray;
  }
};

module.exports = AirportData;
