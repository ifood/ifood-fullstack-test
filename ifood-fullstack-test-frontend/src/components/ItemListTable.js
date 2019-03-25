import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const ItemListTable = ({ items }) => {  
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Unit Price</TableCell>
          <TableCell>Total Value</TableCell>            
        </TableRow>
      </TableHead>        
      <TableBody>
        {items && items.map(item => (
          <TableRow stripedRows>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.unitPrice}</TableCell>
            <TableCell>{item.unitPrice * item.quantity}</TableCell>             
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ItemListTable;