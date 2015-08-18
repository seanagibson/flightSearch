var SearchBox = React.createClass({
  getInitialState: function(){
    return {
      airportList: [],
      costResults: {}
  };
},

  componentDidMount: function(){
  var self = this;
  $.get('/airports', function(result){
    if(self.isMounted()){
      self.setState({airportList: result});
    }
  });
},

  search: function(){
  var selectedDepart = $('.departAirports').val();
  var selectedDest = $('.destinationAirports').val();
  var self = this;
  $.get('/search', {departId: selectedDepart, destId: selectedDest}, function(result){
    self.addSearchResults(result);
  });
},

  addSearchResults: function(results){
    var searchResultsObj = {};
    searchResultsObj = results;
    this.setState({costResults: searchResultsObj});
},

  generateOptions: function(){
      return (
        this.state.airportList.map(function(airport, i){
          <option key={i} value="airport.airportId">
          {airport.city}</option>
        })
      );
},

  render: function(){
    if(this.state.airportList.length > 0){
      return (
        <div className="searchBox">
          <div className="row">
                <div className="col-xs-12 col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <legend>Depart Airport</legend>
                    </div>
                    <div className="col-md-6">
                      <select className="departAirports">{this.generateOptions}</select>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <legend>Destination Airport</legend>
                    </div>
                    <div className="col-md-6">
                      <select className="destinationAirports">{this.generateOptions}</select>
                    </div>
                </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <button className="btn btn-primary" type="submit" onClick={this.search}>Get Route</button>
                </div>
          </div>
          <div id="searchResults">
            <SearchResults costResults={this.state.costResults}/>
          </div>
        </div>
      );
      } else {
      return (
        <div className="searchBox">
          <div className="row">
                <div className="col-xs-12 col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <legend>Depart Airport</legend>
                    </div>
                    <div className="col-md-6">
                      <select className="departAirports">
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <legend>Destination Airport</legend>
                    </div>
                    <div className="col-md-6">
                      <select className="destinationAirports">
                        <option></option>
                      </select>
                    </div>
                </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <button className="btn btn-primary" type="submit" onClick={this.search}>Get Route</button>
                </div>
          </div>
          <div id="searchResults">
            <SearchResults costResults={this.state.costResults}/>
          </div>
        </div>
      );
      }
}

});
