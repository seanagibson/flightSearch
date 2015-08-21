var SearchResults = React.createClass({
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
      <table className="table table-striped">
        <thead>
          <tr>
            <td>Search Based On</td>
            <td>Route</td>
            <td>Miles</td>
            <td>Travel Time</td>
            <td>Flight Cost</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flight Cost</td>
            <td>{typeof this.props.costResults.itinerary === 'undefined' ? '' : this.getRouteString(this.props.costResults.itinerary)}</td>
            <td>{typeof this.props.costResults.miles === 'undefined' ? '' : this.props.costResults.miles}</td>
            <td>{typeof this.props.costResults.duration === 'undefined' ? '' : this.getFlightTime(this.props.costResults.duration)}</td>
            <td>{typeof this.props.costResults.cost === 'undefined' ? '' : this.getCostString(this.props.costResults.cost)}</td>
          </tr>
          <tr>
            <td>Flight Miles</td>
            <td>{typeof this.props.milesResults.itinerary === 'undefined' ? '' : this.getRouteString(this.props.milesResults.itinerary)}</td>
            <td>{typeof this.props.milesResults.miles === 'undefined' ? '' : this.props.milesResults.miles}</td>
            <td>{typeof this.props.milesResults.duration === 'undefined' ? '' : this.getFlightTime(this.props.milesResults.duration)}</td>
            <td>{typeof this.props.milesResults.cost === 'undefined' ? '' : this.getCostString(this.props.milesResults.cost)}</td>
          </tr>
          <tr>
            <td>Flight Time</td>
            <td>{typeof this.props.durationResults.itinerary === 'undefined' ? '' : this.getRouteString(this.props.durationResults.itinerary)}</td>
            <td>{typeof this.props.durationResults.miles === 'undefined' ? '' : this.props.durationResults.miles}</td>
            <td>{typeof this.props.durationResults.duration === 'undefined' ? '' : this.getFlightTime(this.props.durationResults.duration)}</td>
            <td>{typeof this.props.durationResults.cost === 'undefined' ? '' : this.getCostString(this.props.durationResults.cost)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
});
