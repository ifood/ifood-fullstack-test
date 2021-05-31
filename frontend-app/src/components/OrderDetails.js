import './style/main.scss';

import {isEmpty, isNil} from 'ramda';

import OrderItemsModal from "./OrderItemsModal";
import OrderSearch from "./OrderSearch";
import OrderSearchResults from "./OrderSearchResults";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {compose} from 'recompose';
import { connect } from "react-redux";

const hasOrders = (orders) => !isNil(orders) && !isEmpty(orders);

const mapStateToProps = (state) => {
    return { orders: state.orderDetails.orders };
};

const enhance = compose(
    connect(mapStateToProps)
);

export const OrderDetails = ({orders}) => (
    <div className="order-details">
        <Typography variant="h3" gutterBottom className="h2">Order Details</Typography>
        <OrderSearch />
        { hasOrders(orders) && <OrderSearchResults /> }
        <OrderItemsModal />
    </div>
);

export default enhance(OrderDetails);