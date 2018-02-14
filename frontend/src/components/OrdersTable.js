import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import Alert from 'react-bootstrap/lib/Alert'
import {connect} from "react-redux"
import {showItemsModal} from '../actions'
import {searchItems} from '../types'
import moment from 'moment'

const View = ({retrieved, rows, handleRowClick}) => {
  if (!retrieved) return null;
  if (rows.length === 0) {
    return (
      <Alert bsStyle="warning">
        No record found!
      </Alert>
    );
  }
  return (
    <Table responsive striped>
      <thead>
      <tr>
        <th>Date</th>
        <th>Client Name</th>
        <th>Phone</th>
        <th>E-mail</th>
        <th>Total Value</th>
      </tr>
      </thead>
      <tbody>
      {rows.map(row => {
        return (
          <tr key={row.id} onClick={() => { handleRowClick(row) }}>
            <td>{moment.utc(row.createdAt).format('YYYY-MM-DD')}</td>
            <td>{row.clientName}</td>
            <td>{row.clientPhone}</td>
            <td>{row.clientEmail}</td>
            <td>{row.totalValue}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
};

const mapStateToProps = state => {
  return {
    rows: state.orders.list,
    retrieved: state.orders.retrieved
  }
};
const mapDispatchToProps = dispatch => {
  return {
    handleRowClick: (row) => {
      dispatch(showItemsModal(row));
      dispatch(searchItems.request(row))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
