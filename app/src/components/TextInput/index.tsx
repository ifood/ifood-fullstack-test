/* This is actually due to a bug on creat-react-app that uses an old version of
 * typescript-eslint:
 * https://github.com/typescript-eslint/typescript-eslint/issues/2540
 */
// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import useTextInput from './hooks';

export interface TextInputCallbacks {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
}

interface Props extends TextInputCallbacks {
  title: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    field: {
      marginBottom: 8,
      marginLeft: 10,
      marginRight: 10,
    },
  }),
);

const TextInput = ({ onChange, title, value }: Props): ReactElement => {
  const { input } = useTextInput(value);
  const classes = useStyles();
  return (
    <TextField
      className={classes.field}
      id={`text-input-${title}`}
      label={title}
      value={input.current}
      onChange={onChange}
    />
  );
};

export default TextInput;
