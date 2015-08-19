var SearchBox = React.createClass({displayName: "SearchBox",
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
        React.createElement("option", {key: i, value: airportArray[i].airportId}, airportArray[i].city)
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
        React.createElement("div", {className: "searchBox"}, 
          React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("legend", null, "Depart Airport")
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement(AirportSelect, {className: "departAirports", options: this.state.options})
                    )
                  )
                ), 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("legend", null, "Destination Airport")
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement(AirportSelect, {className: "destinationAirports", options: this.state.options})
                    )
                )
                ), 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("button", {className: "btn btn-primary", type: "submit", onClick: this.search}, "Get Route")
                )
          ), 
          React.createElement("div", {id: "searchResults"}, 
            React.createElement(SearchResults, {costResults: this.state.costResults})
          )
        )
      );
    }
});
