var assert = require('assert');
var GraphSearch = require('../graph-search');

describe('GraphSearch shortest path method', function(){
  it('should return an array with the itinerary', function(){
    var graphSearch = new GraphSearch();
    graphSearch.addVertices('cost');
    var itinerary = graphSearch.getShortestPath('SFO', 'LAX');
    assert.equal(itinerary.length, 2);
    assert.equal(itinerary[0], 'SFO');
    assert.equal(itinerary[1], 'LAX');
  });
});
