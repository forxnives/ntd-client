import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link as LinkRoute,
    withRouter 
  } from "react-router-dom";

function Title({history}) {

    setTimeout(()=>history.push('/dashboard'), 2000);

  return (
    <div>
        <h1>Successfully Submitted</h1>
        
    </div>
  );    
}

Title.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Title);