import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link as LinkRoute,
  withRouter 
} from "react-router-dom";


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({outstandingBalance}) {
  const classes = useStyles();

  
  return (
    <React.Fragment>
      <Title>Outstanding Balance</Title>
      <Typography component="p" variant="h4">
        {outstandingBalance}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>

      </Typography>
      <div>
        <LinkRoute color="primary" to="/viewinvoices" >
          View Invoices
        </LinkRoute>
      </div>
    </React.Fragment>
  );
}