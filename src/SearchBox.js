var SearchBox = React.createClass({
  getInitialState: function(){
    return {
      options: [],
      costResults: {},
      milesResults: {},
      durationResults: {},
      alertOn: false
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

    if(selectedDepart == selectedDest){
      this.setState({alertOn: true});
    } else {
      this.setState({alertOn: false});
      $.get('/search', {departId: selectedDepart, destId: selectedDest}, function(results){
        this.addSearchResults(results);
      }.bind(this));
    }
  },

  addSearchResults: function(results){
    var searchResults = [];
    searchResults = results;
    this.setState({costResults: searchResults[0], milesResults: searchResults[1], durationResults: searchResults[2]});
  },

  render: function(){

      return (
        <div className="searchBox">
          <div className="row" id="search-select-row">
                <div className="col-xs-12 col-sm-5 col-md-4">
                    <label for="select" className="control-label">Depart Airport</label>
                    <AirportSelect className="departAirports form-control" options={this.state.options}/>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-4">
                    <label for="select" className="control-label">Destination Airport</label>
                    <AirportSelect className="destinationAirports form-control" options={this.state.options}/>
                </div>
                <div className="col-xs-12 col-sm-2 col-md-3">
                  <button className="btn btn-primary btn-block center-block" id="search-btn" type="submit" onClick={this.search}>Search</button>
                </div>
          </div>
          <div className="alert-container">
            <AlertBox alertOn={this.state.alertOn} />
          </div>
          <div id="searchResults">
            <SearchResults costResults={this.state.costResults} milesResults={this.state.milesResults} durationResults={this.state.durationResults}/>
          </div>
        </div>
      );
    }
});
