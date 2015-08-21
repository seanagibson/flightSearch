var SearchBox = React.createClass({displayName: "SearchBox",
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
        React.createElement("option", {key: i, value: airportArray[i].airportId}, airportArray[i].city)
      );
    }
    this.setState({options: optionsArray});
  },

  search: function(){
    var selectedDepart = $('.departAirports').val();
    var selectedDest = $('.destinationAirports').val();

    if(selectedDepart == selectedDest){
      this.setState({alertOn: !this.state.alertOn});
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

  handleAlert: function(){
    if(this.state.alertOn){
      return (
        React.createElement("div", {className: "alert alert-dismissible alert-danger"}, 
          React.createElement("button", {type: "button", class: "close", "data-dismiss": "alert"}, "×"), 
          React.createElement("strong", null, "Error: Destination airport same as departing airport.")
        )
      );
    } else {
      return;
    }
  },

  render: function(){

      return (
        React.createElement("div", {className: "searchBox"}, 
          React.createElement("div", {className: "row", id: "search-select-row"}, 
                React.createElement("div", {className: "col-xs-12 col-sm-5 col-md-4"}, 
                    React.createElement("label", {for: "select", className: "control-label"}, "Depart Airport"), 
                    React.createElement(AirportSelect, {className: "departAirports form-control", options: this.state.options})
                ), 
                React.createElement("div", {className: "col-xs-12 col-sm-5 col-md-4"}, 
                    React.createElement("label", {for: "select", className: "control-label"}, "Destination Airport"), 
                    React.createElement(AirportSelect, {className: "destinationAirports form-control", options: this.state.options})
                ), 
                React.createElement("div", {className: "col-xs-12 col-sm-2 col-md-3"}, 
                  React.createElement("button", {className: "btn btn-primary btn-block center-block", id: "search-btn", type: "submit", onClick: this.search}, "Search")
                )
          ), 
          React.createElement("div", {className: "alert"}, this.handleAlert), 
          React.createElement("div", {id: "searchResults"}, 
            React.createElement(SearchResults, {costResults: this.state.costResults, milesResults: this.state.milesResults, durationResults: this.state.durationResults})
          )
        )
      );
    }
});
