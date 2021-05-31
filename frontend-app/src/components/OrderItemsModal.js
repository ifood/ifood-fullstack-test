import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import * as actions from "../actions/orderDetails";

export class OrderItemsModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const { items } = nextProps;
        this.setState({
            items
        });
    }

    handleClose() {
        const { toggleItemsModal, open } = this.props;
        toggleItemsModal(open);
    }

    render() {
        const { open } = this.props;
        const { items } = this.state;
        return (
            <Dialog className="items-dialog" maxWidth="md" open={open} onClose={this.handleClose.bind(this)}>
                <DialogTitle id="dialog-title">Order Details</DialogTitle>
                <DialogContent>
                    <Table padding="dense">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => {
                                const total = parseFloat(item.quantity) * parseFloat(item.price);
                                return (
                                    <TableRow className="row" key={index}>
                                        <TableCell align="center">{item.description}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        <TableCell align="center">R$ {parseFloat(item.price).toFixed(2)}</TableCell>
                                        <TableCell align="right">R$ {total.toFixed(2)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.orderDetails.open,
        items: state.orderDetails.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleItemsModal: (open) => dispatch(actions.toggleItemsModal(open))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemsModal);