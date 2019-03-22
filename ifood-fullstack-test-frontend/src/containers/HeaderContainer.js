import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from '../components/FilterForm'

class HeaderContainer extends Component {
  render() {
    return ( 
      <div>
      	<FilterForm/>
      </div>     
    );
  }
}

const mapStateToProps = (state) => {  
  return { };
};

export default connect(mapStateToProps)(HeaderContainer);