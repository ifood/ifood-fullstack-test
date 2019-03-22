import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems:'center',
    justify:'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    alignSelf: 'center'
  },
});

class FilterForm extends Component {
  state = {
    name: null,
    email: null,
    phone: null,
    endDate: null,
    startDate: null,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>          
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={24}>
            <Grid item xs='2.4'>
              <TextField
                id="startDate"
                label="Start Date"
                type="date"          
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.startDate}
                onChange={this.handleChange('startDate')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs='2.4'>
              <TextField
                id="endDate"
                label="End date"
                type="date"          
                className={classes.textField}
                value={this.state.endDate}
                onChange={this.handleChange('endDate')}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs='2.4'>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs='2.4'>
              <TextField
                id="phone"
                label="Phone"
                className={classes.textField}
                value={this.state.phone}
                onChange={this.handleChange('phone')}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs='2.4'>
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                variant="outlined"
              />
            </Grid>                     
            <Grid item xs='12' align-items-xs-center justify-xs-flex-end>
              <Button 
                variant="outlined" 
                className={classes.button}
                type="submit"                
               >
                Search
              </Button>        
            </Grid>
          </Grid>  
        </form>        
      </div>
    );
  }
}

FilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterForm);