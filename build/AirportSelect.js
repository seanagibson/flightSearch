var AirportSelect = React.createClass({displayName: "AirportSelect",

  render: function(){
    return(
        React.createElement("select", {className: this.props.className}, this.props.options)
    )
  }

});
