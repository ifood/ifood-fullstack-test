import React, { useMemo, useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import locales from '../../../locales/filters';
import { OrdersData } from '..';

interface RowProps {
  row: OrdersData;
}

const useRowStyles = makeStyles({
  innerHead: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    textJustify: 'inter-word',
    paddingLeft: 80,
    paddingRight: 80,
  },
  innerHeadTitle: {
    fontSize: 16,
  },
  innerHeadValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const InnerHead = ({ row }: RowProps): JSX.Element => {
  const classes = useRowStyles();
  const spans = useMemo(
    (): JSX.Element[] =>
      ['clientName', 'phone', 'email'].map(
        (text: string): JSX.Element => (
          <div>
            <span id={`head-${text}`} className={classes.innerHeadTitle}>{`${
              locales[text as 'clientName' | 'phone' | 'email']
            }: `}</span>
            <span id={`head-${text}-value`} className={classes.innerHeadValue}>
              {row[text as 'clientName' | 'phone' | 'email']}
            </span>
          </div>
        ),
      ),
    [],
  );
  return <div className={classes.innerHead}>{spans}</div>;
};

const Row = ({ row }: RowProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.clientName}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.totalValue}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <InnerHead row={row} />
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{locales.description}</TableCell>
                    <TableCell>{locales.quantity}</TableCell>
                    <TableCell>{locales.unitPrice}</TableCell>
                    <TableCell>{locales.total}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detail) => (
                    <TableRow key={detail.description}>
                      <TableCell component="th" scope="row">
                        {detail.description}
                      </TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{detail.unitPrice}</TableCell>
                      <TableCell>{detail.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
