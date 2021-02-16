import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(number, total, status, id) {
  return { number, total, status, id };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 1),
  createData('Ice cream sandwich', 237, 9.0, 2),
  createData('Eclair', 262, 16.0, 3),
  createData('Cupcake', 305, 3.7, 4),
  createData('Gingerbread', 356, 16.0, 5),
];

export default function ViewInvoices({invoicesArray}) {

  const classes = useStyles();


  const rows = invoicesArray.map(invoice => {

    return createData(invoice.number, invoice.price, invoice.status, invoice._id )


  })

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>{row.status}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}