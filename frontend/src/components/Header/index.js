import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    title: {
        fontFamily: "'Oleo Script', cursive",
        color: 'rgb(237, 23, 34)',
        userSelect: 'none',
    },
    italian: {
        textShadow: '5px -5px 0 rgb(0, 146, 70), 10px -10px 0 white, 15px -15px 0 rgb(206, 43, 55);',
    },
}));

const Header = ({ italianMode }) => {
    const classes = useStyles();
    const titleClasses = [classes.title];
    if (italianMode) {
        titleClasses.push(classes.italian);
    }
    return (
      <header>
        <Typography className={titleClasses.join(' ')} variant="h2" component="h2">Order List</Typography>
      </header>
    );
};

Header.propTypes = {
    italianMode: PropTypes.bool.isRequired,
};

export default Header;
