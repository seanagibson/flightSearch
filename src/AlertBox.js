var AlertBox = React.createClass({
  render: function(){
    if(this.props.alertOn){
      return (
        <div className="alert alert-dismissible alert-danger">
        <strong>Error: Destination airport same as departing airport.</strong>
      </div>
      );
    } else {
      return (<div></div>);
    }
  }
});
