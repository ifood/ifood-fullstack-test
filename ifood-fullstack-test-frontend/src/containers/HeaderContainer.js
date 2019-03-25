import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getOrderList } from '../actions';
import FilterForm from '../components/FilterForm'

class HeaderContainer extends Component {
  handleSubmit(params) {
  	console.log(params)
  	this.props.getOrderList(params)
  }

  render() {
    return ( 
      <div>
      	<FilterForm handleSubmit={this.handleSubmit.bind(this)}/>
      </div>     
    );
  }
}

const mapStateToProps = (state) => {  
  return { };
};

export default connect(mapStateToProps, { getOrderList })(HeaderContainer);