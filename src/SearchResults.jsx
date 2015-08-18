var SearchResults = React.createClass({
  getInitialState: function(){
    return {
    costResults: {}
    };
  },

  render: function(){
    var routeString = typeof this.props.costResults.itinerary === 'undefined' ? '' : this.props.costResults.itinerary.join(', ');

    return(
      <table className="table">
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
            <td>{routeString}</td>
            <td>{typeof this.props.costResults.miles === 'undefined' ? '' : this.props.costResults.miles}</td>
            <td>{typeof this.props.costResults.duration === 'undefined' ? '' : this.props.costResults.duration}</td>
            <td>{typeof this.props.costResults.cost === 'undefined' ? '' : this.props.costResults.cost}</td>
          </tr>
        </tbody>
      </table>
    );
  }
});
