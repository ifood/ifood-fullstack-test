import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DetailDialog from './DetailDialog'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class OrderListTable extends Component {  
  state = {
    openDialog: false,
    selectedOrder: null,
  };

  handleClick(order) {
    this.setState({
      openDialog: true,
      selectedOrder: order
    });
  };

  handleCloseClick() {
    console.log("Dale")
    this.setState({
      openDialog: false,
      selectedOrder: null
    });
  }

  render() {
    return (
      <Paper>  
        <DetailDialog
          open={this.state.openDialog}
          order={this.state.selectedOrder}
          handleClose={this.handleCloseClick.bind(this)}
        />        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Total Value</TableCell>
            </TableRow>
          </TableHead>        
          <TableBody stripedRows>
            {this.props.data && this.props.data.map(order => (
              <TableRow key={order.id} onClick={event => this.handleClick(order)}>
                <TableCell component="th" scope="row">
                  {order.createdAt}
                </TableCell>
                <TableCell>{order.client.name}</TableCell>
                <TableCell>{order.client.phone}</TableCell>
                <TableCell>{order.client.email}</TableCell>
                <TableCell>{order.totalVal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )}
}

export default OrderListTable;