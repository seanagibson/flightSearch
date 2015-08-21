var SearchResults = React.createClass({displayName: "SearchResults",
  getInitialState: function(){
    return {
    costResults: {},
    milesResults: {},
    durationResults: {}
    };
  },

  getRouteString: function(itinerary){
    return itinerary.join(', ');
  },

  getFlightTime: function(duration){
    return duration + " hrs";
  },

  getCostString: function(cost){
    return "$" + cost + ".00";
  },

  render: function(){
    return(
      React.createElement("table", {className: "table table-striped"}, 
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
            React.createElement("td", null, typeof this.props.costResults.itinerary === 'undefined' ? '' : this.getRouteString(this.props.costResults.itinerary)), 
            React.createElement("td", null, typeof this.props.costResults.miles === 'undefined' ? '' : this.props.costResults.miles), 
            React.createElement("td", null, typeof this.props.costResults.duration === 'undefined' ? '' : this.getFlightTime(this.props.costResults.duration)), 
            React.createElement("td", null, typeof this.props.costResults.cost === 'undefined' ? '' : this.getCostString(this.props.costResults.cost))
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Flight Miles"), 
            React.createElement("td", null, typeof this.props.milesResults.itinerary === 'undefined' ? '' : this.getRouteString(this.props.milesResults.itinerary)), 
            React.createElement("td", null, typeof this.props.milesResults.miles === 'undefined' ? '' : this.props.milesResults.miles), 
            React.createElement("td", null, typeof this.props.milesResults.duration === 'undefined' ? '' : this.getFlightTime(this.props.milesResults.duration)), 
            React.createElement("td", null, typeof this.props.milesResults.cost === 'undefined' ? '' : this.getCostString(this.props.milesResults.cost))
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Flight Time"), 
            React.createElement("td", null, typeof this.props.durationResults.itinerary === 'undefined' ? '' : this.getRouteString(this.props.durationResults.itinerary)), 
            React.createElement("td", null, typeof this.props.durationResults.miles === 'undefined' ? '' : this.props.durationResults.miles), 
            React.createElement("td", null, typeof this.props.durationResults.duration === 'undefined' ? '' : this.getFlightTime(this.props.durationResults.duration)), 
            React.createElement("td", null, typeof this.props.durationResults.cost === 'undefined' ? '' : this.getCostString(this.props.durationResults.cost))
          )
        )
      )
    );
  }
});
