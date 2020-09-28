import 'date-fns';
/* This is actually due to a bug on creat-react-app that uses an old version of
 * typescript-eslint:
 * https://github.com/typescript-eslint/typescript-eslint/issues/2540
 */
// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import useDatePicker from './hooks';

export interface DatePickerCallbacks {
  onChange: (date: Date | null) => void;
  value: Date | undefined | null;
}

interface Props extends DatePickerCallbacks {
  text: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    picker: {
      marginLeft: 10,
      marginRight: 10,
    },
  }),
);

const DatePicker = ({ text, value, onChange }: Props): ReactElement => {
  const classes = useStyles();
  const { selectedDate, handleDateChange } = useDatePicker({ value, onChange });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id={`date-picker-${text}`}
        label={text}
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        className={classes.picker}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
