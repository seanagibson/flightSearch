var SearchBox = React.createClass({displayName: "SearchBox",
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
          React.createElement("option", {key: i, value: "airport.airportId"}, 
          airport.city)
        })
      );
},

  render: function(){
    if(this.state.airportList.length > 0){
      return (
        React.createElement("div", {className: "searchBox"}, 
          React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("legend", null, "Depart Airport")
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("select", {className: "departAirports"}, this.generateOptions)
                    )
                  )
                ), 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("legend", null, "Destination Airport")
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("select", {className: "destinationAirports"}, this.generateOptions)
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
      } else {
      return (
        React.createElement("div", {className: "searchBox"}, 
          React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("legend", null, "Depart Airport")
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("select", {className: "departAirports"}, 
                        React.createElement("option", null)
                      )
                    )
                  )
                ), 
                React.createElement("div", {className: "col-xs-12 col-md-4"}, 
                  React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("legend", null, "Destination Airport")
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                      React.createElement("select", {className: "destinationAirports"}, 
                        React.createElement("option", null)
                      )
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
}

});
