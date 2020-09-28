import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface Props {
  onClick: () => void;
  title: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginBottom: 10,
      marginTop: 30,
      position: 'relative',
      top: '50%',
      right: '50%',
    },
  })
);

const PillButton = ({ onClick, title }: Props): ReactElement => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default PillButton;
