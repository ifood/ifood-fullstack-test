/* This is actually due to a bug on creat-react-app that uses an old version of
 * typescript-eslint:
 * https://github.com/typescript-eslint/typescript-eslint/issues/2540
 */
// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import useOrdersTable from './hooks';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 100];

interface Column {
  id: 'date' | 'clientName' | 'phone' | 'email' | 'totalValue';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface OrdersData {
  date: string;
  clientName: string;
  phone: string;
  email: string;
  totalValue: string;
}

export const toCurrencyText = (value: number): string =>
  `$ ${value.toFixed(2)}`;

const columns: Column[] = [
  { id: 'date', label: 'Date', minWidth: 150 },
  { id: 'clientName', label: 'Client Name', minWidth: 200 },
  { id: 'phone', label: 'Phone', minWidth: 200 },
  { id: 'email', label: 'E-Mail', minWidth: 200 },
  {
    format: toCurrencyText,
    id: 'totalValue',
    label: 'Total Value',
    minWidth: 100,
  },
];

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
  root: {
    flex: 1,
    marginBottom: 100,
    marginTop: 50,
  },
});

interface Props<T> {
  rows: T;
}

// TODO: Replace with VirtualizedTable implementation
const OrdersTable = <T extends Array<OrdersData>>({
  rows,
}: Props<T>): ReactElement => {
  const classes = useStyles();
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useOrdersTable();

  const TableHeadElement = useMemo(
    (): JSX.Element[] =>
      columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      )),
    [],
  );

  const TableRowsElements = useMemo(
    (): JSX.Element[] =>
      rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={`${row.date}${row.clientName}${row.phone}${row.email}${row.totalValue}`}
            >
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        }),
    [rows, rowsPerPage, page],
  );

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>{TableHeadElement}</TableRow>
          </TableHead>
          <TableBody>{TableRowsElements}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrdersTable;
