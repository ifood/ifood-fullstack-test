/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ThemeService from '../../services/ThemeService';

const useStyles = makeStyles(() => ({
    title: {
        fontFamily: "'Oleo Script', cursive",
        color: 'white',
        cursor: 'pointer',
        fontSize: '2em',
    },
}));

const ItalianMode = ({ changeTheme }) => {
    const classes = useStyles();
    return (
        <span className={classes.title} onClick={changeTheme}>
            Italian Mode
        </span>
    );
};
const mapDispatchToProps = (dispatch) => ({
    changeTheme: () => dispatch(ThemeService.changeTheme()),
});

ItalianMode.propTypes = {
    changeTheme: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ItalianMode);
