import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { Container, makeStyles } from '@material-ui/core';
import Modal from '../Modal';
import { formatDate, formatCurrency } from '../../services/Util';

const useStyles = makeStyles(() => ({
    actionButton: {
        border: 'none',
        backgroundColor: 'transparent',
        color: 'blue',
    },
}));

const Grid = ({ orders }) => {
    const classes = useStyles();
    const [modal, setModal] = React.useState({ open: false, details: {} });
    const openModal = (params) => {
        setModal({
            open: true,
            details: params.data,
        });
    };

    const handleClose = () => {
        setModal({
            open: false,
            details: {},
        });
    };

    const renderActionButton = (params) => {
        let total = params.data.items.reduce((accumulator, currentValue) => (accumulator + (currentValue.price * currentValue.quantity)), 0);
        total = formatCurrency(total);
        return (
            <button className={classes.actionButton} onClick={() => openModal(params)} type="button" key={params.value}>{total}</button>
        );
    };

    const width = 220;
    const columns = [
        {
            field: 'createdAt',
            headerName: 'Date',
            width,
            valueGetter: (params) => formatDate(params.value),
        },
        {
            field: 'client.name',
            headerName: 'Client Name',
            width,
            valueGetter: (params) => params.data.client.name,
        },
        {
            field: 'client.phone',
            headerName: 'Phone',
            width,
            valueGetter: (params) => params.data.client.phone,
        },
        {
            field: 'client.email',
            headerName: 'E-mail',
            width,
            valueGetter: (params) => params.data.client.email,
        },
        {
            field: 'total',
            headerName: 'Total Value',
            width,
            renderCell: (params) => renderActionButton(params),
        },
    ];

    return (
        <Container>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid disableSelectionOnClick rows={orders} columns={columns} pageSize={5} />
                <Modal {...modal} handleClose={handleClose} />
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    orders: state.orderReducer.orders,
});

Grid.propTypes = {
    orders: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Grid);
