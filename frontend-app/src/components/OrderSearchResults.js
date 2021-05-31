import * as actions from "../actions/orderDetails";

import PropTypes from 'prop-types';
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { compose } from "recompose";
import { connect } from "react-redux";
import moment from "moment";

const openDetailsDialog = ({index, orders, fetchOrderItems, toggleItemsModal}) => {
    toggleItemsModal();
    fetchOrderItems(orders[index].items);
}

const mapStateToProps = (state) => {
    return {
        orders: state.orderDetails.orders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleItemsModal: () => dispatch(actions.toggleItemsModal()),
        fetchOrderItems: (items) => dispatch(actions.fetchOrderItems(items))
    };
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
)

export const OrderSearchResults = ({ orders, fetchOrderItems, toggleItemsModal }) => (
    <Table className="search-results">
        <TableHead>
            <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Client Name</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Total</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {orders.map((row, index) => {
                const total = row.items.reduce((acc, curr) => {
                    const qty = parseFloat(curr.quantity);
                    const price = parseFloat(curr.price);
                    acc = parseFloat(acc);
                    return acc + (qty * price);
                }, 0.0);
                return (
                    <TableRow className="row" key={index} onClick={() => openDetailsDialog({index, orders, fetchOrderItems, toggleItemsModal})} >
                        <TableCell align="center" >{moment(row.createdAt).format('MM-DD-YYYY')}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="right">R$ {total.toFixed(2)}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
);

OrderSearchResults.propTypes = {
    orders: PropTypes.array.isRequired,
    fetchOrderItems: PropTypes.func.isRequired,
    toggleItemsModal: PropTypes.func.isRequired,
}

OrderSearchResults.defaultProps = {
    orders: [],
}

export default enhance(OrderSearchResults);