var AlertBox = React.createClass({displayName: "AlertBox",
  render: function(){
    if(this.props.alertOn){
      return (
        React.createElement("div", {className: "alert alert-dismissible alert-danger"}, 
        React.createElement("strong", null, "Error: Destination airport same as departing airport.")
      )
      );
    } else {
      return (React.createElement("div", null));
    }
  }
});
