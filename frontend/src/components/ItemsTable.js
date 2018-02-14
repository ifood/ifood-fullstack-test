import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import {connect} from "react-redux"

const View = ({rows}) => {
  if (rows.length === 0) return null;
  return (
    <Table responsive striped>
      <thead>
      <tr>
        <th>Description</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      {rows.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.description}</td>
            <td>{row.quantity}</td>
            <td>{row.price}</td>
            <td>{row.total}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
};

const mapStateToProps = state => {
  return {
    rows: state.orders.modal.items.map(item => {
      return {
        ...item,
        total: item.quantity * item.price
      }
    })
  }
};

export default connect(mapStateToProps)(View);
