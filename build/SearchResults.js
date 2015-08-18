var SearchResults = React.createClass({displayName: "SearchResults",
  getInitialState: function(){
    return {
    costResults: {}
    };
  },

  render: function(){
    var routeString = typeof this.props.costResults.itinerary === 'undefined' ? '' : this.props.costResults.itinerary.join(', ');

    return(
      React.createElement("table", {className: "table"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Search Based On"), 
            React.createElement("td", null, "Route"), 
            React.createElement("td", null, "Miles"), 
            React.createElement("td", null, "Travel Time"), 
            React.createElement("td", null, "Flight Cost")
          )
        ), 
        React.createElement("tbody", null, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Flight Cost"), 
            React.createElement("td", null, routeString), 
            React.createElement("td", null, typeof this.props.costResults.miles === 'undefined' ? '' : this.props.costResults.miles), 
            React.createElement("td", null, typeof this.props.costResults.duration === 'undefined' ? '' : this.props.costResults.duration), 
            React.createElement("td", null, typeof this.props.costResults.cost === 'undefined' ? '' : this.props.costResults.cost)
          )
        )
      )
    );
  }
});
