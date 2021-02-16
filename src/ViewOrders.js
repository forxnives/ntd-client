import React, { useEffect, useState } from 'react';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


  function createData(id, number, date, items, status, requests, repliedPrice) {
    return {
        id,
      number,
      date,
      items,
      status,
      requests,
      repliedPrice,

    };
  }



  function Row(props) {
    const { row, history, update, updateValue } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();


    const requestInvoice = async (id) => {


        try {
            const response = await fetch('http://localhost:3000/requestinvoice', {

                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: id
                }),
            })


            const data = await response.json()


            if (response.status===500) {

                throw new Error('Failure to retrieve')

            }else {
                update(!updateValue)
                history.push('/submitsuccess')
            }



          
        } catch(err) {

            console.log(err.message)
        }
    }


  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.number}
          </TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.items}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>



                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" >Quantity</TableCell>
                      <TableCell align="center" >Packing</TableCell>
                      <TableCell align="center" >Item</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.requests.map((requestRow, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">
                          {requestRow.quantity}
                        </TableCell>
                        <TableCell align="center" >{requestRow.packing}</TableCell>
                        <TableCell align="center" >{requestRow.item}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>


                {
                    row.repliedPrice ?  ( <Box flexDirection="column" >
                    <Typography variant="h6" gutterBottom component="div">
                    Total Price: {row.repliedPrice}
                    </Typography>

                    { row.status === 'REPLIED' && (
                    <Button onClick={() => requestInvoice(row.id)} color='primary'>
                        Request Invoice
                    </Button>
                    ) }

                    
                    </Box>
                  ) : (
                    null
                  )
                }



              
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24,),

//   ];








const ViewOrders = ({history, ordersArray, update, updateValue}) => {

    
    


    // const classes = useStyles();

    const rows = ordersArray.map(order => {

        if (order.replyItems.length) {
            return createData(order._id, order.orderNumber, order.date, order.replyItems.length, order.invoiceStatus, order.replyItems, order.replyTotalPrice)

        } else {
            return createData(order._id, order.orderNumber, order.date, order.requests.length, order.invoiceStatus, order.requests, order.replyTotalPrice)
        }

    })


    // useEffect(()=>{
        
    //     const retrieveOrders = async (e) => {

    //         try {
    //             const response = await fetch('http://localhost:3000/ordersretrieve', {
    //                 method: 'PUT',
    //                 headers: {
    //                   'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     customerId: '6026ccf275a0066b1cf32b86'
    //                 }),
    //             })
    //             if (response.status===500) {
    //                 throw new Error('Failure to retrieve')
    //             }

    //             const data = await response.json()

    //             console.log(data)
    //             setOrdersArray(data.data)
              
    //         } catch(err) {
    //             setError(err.message);
    //             console.log(err.message)
    //         }
    //     }

    //     retrieveOrders()

    // },[])





    return (

        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row update={update} updateValue={updateValue} history={history} key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    )
}

export default withRouter(ViewOrders);