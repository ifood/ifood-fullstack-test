// start: Imports
// Core
import React, { Component } from 'react'
import { connect } from 'react-redux'
// Ui Ux
import { Container } from 'react-grid-system'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import {Card } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';
// Formatters
import moment from 'moment';
import numeral from 'numeral'
// Actions
import { fetchOrders, fetchCompleted } from '../actions/orderActions'
// -- end: Imports

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filters,
    orders: state.order.orders,
    status: state.order.status,
    error: state.order.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (filters) => {
      dispatch(fetchOrders(filters))
    },
    fetchCompleted: () => {
      dispatch(fetchCompleted())
    }
  }
}

class OrderList extends Component {

  constructor(props) {
    super(props)
    moment.locale('br');

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
      selected: [],
      open: false,
      orderDetails: {}
    }

  }

  componentWillMount() {
    this.props.fetchOrders(this.props.filters)
  }

  componentDidUpdate(nextProps, nextState) {
    setTimeout(() => {
      this.props.fetchCompleted()
    },
    300)
  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1
  }

  handleRowSelection = (selectedRows) => {
    if (selectedRows.length === 0) {
      selectedRows = [0]
    }

    this.setState({
      selected: selectedRows,
      orderDetails: this.props.orders[selectedRows]
    })
    this.handleOpen()
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({
      open: false,
      orderDetails: {}
    })
  }

  renderDetailsDialog () {

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ]

    return (
      <Dialog title="Order Details" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} >
          <span> Client Name: <b>{this.state.orderDetails.clientName} </b></span><br/>
          <span> Phone: <b>{this.state.orderDetails.clientPhone} </b></span><br/>
          <span> Email: <b>{this.state.orderDetails.clientEmail} </b></span><br/>
          <hr/>
          <Table>
            <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
              <TableRow>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Unit Price</TableHeaderColumn>
                <TableHeaderColumn>Total</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                { this.renderDetailItems() }
            </TableBody>
          </Table>
      </Dialog>
    )
  }

  renderDetailItems () {

    let itemsList = this.state.orderDetails.items

    if (itemsList) {
      return itemsList.map( (item, i) => {
        return (<TableRow key={i} selected={this.isSelected(i)}>
                    <TableRowColumn> { item.description } </TableRowColumn>
                    <TableRowColumn> { item.quantity } </TableRowColumn>
                    <TableRowColumn> { numeral(item.price).format('$0,0.00') } </TableRowColumn>
                    <TableRowColumn> { numeral(item.price *  item.quantity).format('$0,0.00') } </TableRowColumn>
                </TableRow>)
      }
    )} else {
      return (<TableRow>
                  <TableRowColumn><h4>No data found!</h4></TableRowColumn>
              </TableRow>)
    }

  }

  renderOrders () {

    let ordersList = this.props.orders

    if (ordersList.length > 0) {
      return ordersList.map( (order, i) => {
        return (<TableRow key={i} selected={this.isSelected(i)}>
                    <TableRowColumn> { moment(order.createdAt).format('DD/MM/YYYY') } </TableRowColumn>
                    <TableRowColumn> { order.clientName } </TableRowColumn>
                    <TableRowColumn> { order.clientPhone } </TableRowColumn>
                    <TableRowColumn> { order.clientEmail } </TableRowColumn>
                    <TableRowColumn> { numeral(order.total).format('$0,0.00') } </TableRowColumn>
                </TableRow>)
      }
    )} else {
      return (<TableRow>
                <TableRowColumn> </TableRowColumn>
                <TableRowColumn> </TableRowColumn>
                <TableRowColumn> { this.renderLoading() }
                </TableRowColumn>
                  <TableRowColumn> </TableRowColumn>
                  <TableRowColumn> </TableRowColumn>
              </TableRow>)
    }
  }

  renderLoading() {

    const style = {
        refresh: {
          display: 'inline-block',
          position: 'relative',
        }
    }

    if (this.props.status === "loading") {
      return (<RefreshIndicator size={40} left={10} top={0} style={style.refresh} status="loading" />)
    } else {
      return (<h5>No Data found!</h5>)
    }

  }

  render() {
    return (
      <Card>
      <Container>
      <Snackbar
        open={ (this.props.error !== "") }
        message= { ((this.props.error) ? this.props.error : "Error!") }
        autoHideDuration={4000}
      />
      { this.renderDetailsDialog() }
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader displaySelectAll={this.state.showCheckboxes} selectable = {this.state.selectable} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Cient Name</TableHeaderColumn>
            <TableHeaderColumn>Phone</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Total Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={this.state.deselectOnClickaway} showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows}>
            { this.renderOrders() }
        </TableBody>
      </Table>
      </Container>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
