import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, makeStyles } from '@material-ui/core';
import { formatCurrency } from '../../services/Util';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    detailsFlex: {
        marginBottom: 32,
        display: 'flex',
        justifyContent: 'space-between',
        '& span': {
            fontWeight: 600,
        },
    },
}));

const Modal = ({ open, handleClose, details }) => {
    if (!details.items) return null;
    const classes = useStyles();

    return (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Order Details</DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <div className={classes.detailsFlex}>
                    <div>
                        Client Name:
                        <span>{details.client.name}</span>
                    </div>
                    <div>
                        Phone:
                        <span>{details.client.phone}</span>
                    </div>
                    <div>
                        E-mail:
                        <span>{details.client.email}</span>
                    </div>
                </div>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Unit Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {details.items.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{formatCurrency(row.price * row.quantity)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
};

export default Modal;
