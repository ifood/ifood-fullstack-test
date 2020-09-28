/* This is actually due to a bug on creat-react-app that uses an old version of
 * typescript-eslint:
 * https://github.com/typescript-eslint/typescript-eslint/issues/2540
 */
// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useMemo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import DatePicker from '../DatePicker';
import TextInput from '../TextInput';
import PillButton from '../PillButton';
import OrdersTable from '../OrdersTable';
import strings from '../../locales/filters';

import useFilters from './hooks';

interface Props {
  title?: string;
}

export interface FilterList {
  startDate?: Date | null;
  endDate?: Date | null;
  clientName?: string;
  phone?: string;
  email?: string;
}

type FilterDateKeys = keyof Pick<FilterList, 'startDate' | 'endDate'>;
type FilterTextKeys = keyof Omit<FilterList, 'startDate' | 'endDate'>;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flex: 1,
      marginTop: 50,
    },
    filters: {
      flexGrow: 1,
      marginTop: 20,
      padding: 10,
    },
    form: {
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 1,
    },
    title: {
      color: '#002984',
      fontSize: 40,
      textAlign: 'left',
    },
  }),
);

const Filters = ({ title }: Props): ReactElement => {
  const classes = useStyles();
  const {
    setDatePickerCallbacks,
    setInputCallbacks,
    filterTableData,
    tableData,
  } = useFilters();

  const DatePickers = useMemo(
    (): JSX.Element[] =>
      ['startDate', 'endDate'].map(
        (date: string, index: number): JSX.Element => (
          <DatePicker
            key={index}
            text={strings[date as FilterDateKeys]}
            {...setDatePickerCallbacks(date as FilterDateKeys)}
          />
        ),
      ),
    [setDatePickerCallbacks],
  );

  const TextInputs = useMemo(
    (): JSX.Element[] =>
      ['clientName', 'phone', 'email'].map(
        (text: string, index: number): JSX.Element => (
          <TextInput
            key={index}
            title={strings[text as FilterTextKeys]}
            {...setInputCallbacks(text as FilterTextKeys)}
          />
        ),
      ),
    [setInputCallbacks],
  );

  return (
    <div className={classes.container}>
      <p className={classes.title}>{title}</p>
      <Grid
        container
        className={classes.form}
        direction="column"
        justify="flex-start"
        alignItems="flex-end"
      >
        <Grid
          container
          className={classes.filters}
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
        >
          {DatePickers}
          {TextInputs}
        </Grid>
        <PillButton title="Search" onClick={filterTableData} />
      </Grid>
      {tableData && <OrdersTable rows={tableData} />}
    </div>
  );
};

export default Filters;
