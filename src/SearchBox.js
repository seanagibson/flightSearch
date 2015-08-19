var SearchBox = React.createClass({
  getInitialState: function(){
    return {
      options: [],
      costResults: {}
    };
  },

  componentDidMount: function(){
    $.get('/airports', function(results){
      if(this.isMounted()){
        this.handleOptions(results);
      }
    }.bind(this));
  },

  handleOptions: function(data){
    var airportArray = data;
    var optionsArray = [];
    for(var i = 0; i < airportArray.length; i++){
      optionsArray.push(
        <option key={i} value={airportArray[i].airportId}>{airportArray[i].city}</option>
      );
    }
    this.setState({options: optionsArray});
  },

  search: function(){
    var selectedDepart = $('.departAirports').val();
    var selectedDest = $('.destinationAirports').val();

    $.get('/search', {departId: selectedDepart, destId: selectedDest}, function(results){
      this.addSearchResults(results);
    }.bind(this));
  },

  addSearchResults: function(results){
    var searchResultsObj = {};
    searchResultsObj = results;
    this.setState({costResults: searchResultsObj});
  },

  render: function(){

      return (
        <div className="searchBox">
          <div className="row">
                <div className="col-xs-12 col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <legend>Depart Airport</legend>
                    </div>
                    <div className="col-md-6">
                      <AirportSelect className="departAirports" options={this.state.options}/>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <legend>Destination Airport</legend>
                    </div>
                    <div className="col-md-6">
                      <AirportSelect className="destinationAirports" options={this.state.options}/>
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
});
