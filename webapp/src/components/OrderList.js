import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container } from 'react-grid-system';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Card } from 'material-ui/Card';
import { fetchOrders } from '../actions/orderActions'

const mapStateToProps = (state) => {
  return {
    filters: state.filter,
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (filters) => {
      dispatch(fetchOrders(filters))
    }
  }
}

class OrderList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    }

  }

  componentDidMount() {
    console.log("fetching...")
    this.props.fetchOrders(this.props.filters)
  }

  componentWillReceiveProps(nextProps) {
    console.log("will receive props...", nextProps)
  }
  renderOrders () {
    console.log("renderOrders()...", this.props.orders)
    return this.props.orders.map( (order, i) => {
      console.log("...singleOrder()", order)
      return (<TableRow key={i}>
                  <TableRowColumn>Teste</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
              </TableRow>)
    }
  )
  }

  render() {
    console.log("render().")
    return (
      <Card>
      <Container>
      <Table>
        <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
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
