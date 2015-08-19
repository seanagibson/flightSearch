var AirportSelect = React.createClass({

  render: function(){
    return(
        <select className={this.props.className}>{this.props.options}</select>
    )
  }

});
