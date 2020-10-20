import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Container, Button, makeStyles } from '@material-ui/core';
import Editor from './editor';
import OrderService from '../../services/OrderService';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '4em',
    },
    searchButton: {
        [theme.breakpoints.down('sm')]: {
            width: '88%',
        },
        [theme.breakpoints.up('md')]: {
            width: '128px',
        },
        [theme.breakpoints.down('lg')]: {
            width: '200px',
        },
    },
}));

export function Filter({ search }) {
    const classes = useStyles();
    const filterParameters = {};

    return (
        <>
            <Container maxWidth={false}>
                <Grid container className={classes.root}>
                    <Grid container justify="center" spacing={4}>
                        <Editor onChange={(value) => { filterParameters.startDate = value; }} type="date" label="Start Date" />
                        <Editor onChange={(value) => { filterParameters.endDate = value; }} type="date" label="End Date" />
                        <Editor onChange={(value) => { filterParameters.clientName = value; }} label="Client Name" />
                        <Editor onChange={(value) => { filterParameters.phone = value; }} type="phone" label="Phone" />
                        <Editor onChange={(value) => { filterParameters.mail = value; }} type="email" label="E-Mail" />
                    </Grid>
                </Grid>
            </Container>
            <div className={classes.buttonContainer}>
                <Button className={classes.searchButton} onClick={() => search(filterParameters)} variant="contained">Search</Button>
            </div>
        </>
    );
}

Filter.propTypes = {
    search: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    search: (filterParameters) => dispatch(OrderService.search(filterParameters)),
});

export default connect(null, mapDispatchToProps)(Filter);
