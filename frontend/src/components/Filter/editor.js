import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';

const Editor = ({ label, type, onChange }) => {
    const hangleChange = (e) => onChange(e.target.value);
    const maxLength = {
        phone: 14,
        text: 100,
        date: 8,
    };
    return (
        <Grid item xs={12} md>
            <TextField
              fullWidth
              onChange={(hangleChange)}
              label={label}
              type={type || 'text'}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              inputProps={{ maxLength: maxLength[type] }}
            />
        </Grid>
    );
};

Editor.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default Editor;
