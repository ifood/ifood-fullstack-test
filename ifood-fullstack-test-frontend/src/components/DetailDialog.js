import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ItemListTable from './ItemListTable'


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    flexGrow: 1,
  },
}))(MuiDialogContent);

class DetailDialog extends Component {
	renderContentHeader(client) {		
		return (
			<div>
				<Grid container spacing={24}>
					<Grid item xs>
						Client name: {client.name}
					</Grid>
					<Grid item xs>
						phone: {client.phone}
					</Grid>
					<Grid item xs>
						email: {client.email}
					</Grid>
				</Grid>
			</div>
		)
	}

  render() {
  	const { order, handleClose, open } = this.props

    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth='md'
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Order Details
          </DialogTitle>
          <DialogContent>  
          	{order && this.renderContentHeader(order.client)}
          	{order && <ItemListTable items={order.items}/>}
          </DialogContent>          
        </Dialog>
      </div>
    );
  }
}

export default DetailDialog