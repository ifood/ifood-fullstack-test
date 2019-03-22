import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderListTable from '../components/OrderListTable';

import { getOrderList } from '../actions';

class TableContainer extends Component {
  
  componentWillMount() {
    this.props.getOrderList();
  }

  render() {
    console.log('tabledata' + this.props.orderList)
    return ( 
      <OrderListTable 
        data={this.props.orderList}
        isLoading={this.props.isLoading}
      >
      </OrderListTable> 
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isLoadingList: isLoading,
    orderList,
    isResentingState
  } = state.orders;

  return { isLoading, orderList, isResentingState };
};

export default connect(mapStateToProps, { getOrderList })(TableContainer);
