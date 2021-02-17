import React, { useEffect, useState } from 'react';

// import { Box, Button, ButtonCSS, Input, TableCaption, Text, Icon, TableHead, TableRow, TableCell, CheckBox, Link, TableBody, Table, Badge, Label } from '@admin-bro/design-system';
// import { Button, ButtonCSS, Text, CheckBox, Link, Badge } from '@admin-bro/design-system';
import { Box, Button, Container, TableCaption, Label, Input, FormControl, Icon, TableHead, TableRow, TableCell, TableBody, Table, MenuItem, Select} from '@material-ui/core/';

import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
// import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    tableHead: {
        width: 5,
    }

  }));


const NewOrder = ({history, update, updateValue, invoicesArray}) => {


    const [rowsArray, setRowsArray] = useState([1, 2])

    const [ selectedPaymentMethod, changeSelectedPaymentMethod ] = useState('CASH')

    const [ selectedPaymentStatus, changeSelectedPaymentStatus ] = useState('UNPAID')

    const [ error, setError ] = useState(undefined);

    const classes = useStyles();

    useEffect (() => {

    }, [rowsArray]) 


    const filteredArray = invoicesArray.filter(invoice => (
        invoice.status === 'UNPAID'
    ))







    const handleOrderCreateSubmit = async (e) => {

        try {
            e.preventDefault();

            if (filteredArray.length) {
                alert('You have an unpaid invoice')
                throw new Error('Unpaid Invoice')
            }





            const nodeList = document.querySelectorAll('.orderrow')

            const ordersArray = [...nodeList].map(node => {
        
                 const inputNodes = node.querySelectorAll('input')
                 return {quantity: inputNodes[0].value, packing: inputNodes[1].value, item: inputNodes[2].value}
            })



            const response = await fetch('http://localhost:3000/ordercreate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
    
                    customerId: '6026ccf275a0066b1cf32b86',
                    customer: 'cashcustomer',
                    customerCode: 'CLI0001',
                    invoiceStatus: 'REQUESTED',
                    date: new Date(),
                
                    requests: ordersArray,
                    
                }),

            })
    
            if (response.status===500) {
                throw new Error('Upload Failure')
            }
  
            if (response.status===200) {
                update(!updateValue)
                history.push('/submitsuccess')
            }
            // console.log(thing);
            
        
        } catch(err) {
            setError(err.message);
            console.log(err.message)
        }

    }


    const handleAddRow = () => {

        setRowsArray([...rowsArray, (rowsArray.length+1)])
        
    }



    const handleRowDelete = (e, value) => {
        

        if (rowsArray.length > 1) {

            // console.log(e.target)
            // console.log(e.target.parentNode.parentNode.parentNode)


            if (e.target.nodeName === "svg") {
                e.target.parentNode.parentNode.parentNode.remove()
            }
    
    
            if (e.target.nodeName === "path") {
                e.target.parentNode.parentNode.parentNode.parentNode.remove()
            }            
        }

    }



    const createTableRows = (rowsArray) => (
       


        rowsArray.map((row, index, array) => (
            <TableRow  className='orderrow'>

                <TableCell><Box color='red' onClick={()=>handleAddRow()}  flex justifyContent='center' alignItems='center'  >
                    
                    { index === 0 ? (<AddCircleIcon color='primary' />) : (null)}
                    
                    </Box></TableCell>
                <TableCell padding='checkbox' size='small' ><Input /></TableCell>
                <TableCell padding='checkbox'><Input /></TableCell>
                <TableCell padding='checkbox'><Input /></TableCell>

                <TableCell><Box color='red' onClick={(e)=>handleRowDelete(e, row)}  flex justifyContent='center' alignItems='center' >
                    
                    { index === 0 ? (null) : (<CancelIcon />) }


                    </Box></TableCell>


            </TableRow>
        ))

    )





    return (

        

        <form onSubmit={(e)=> handleOrderCreateSubmit(e)}> 
            

            {/* <Input type='submit' width={1/2} /> */}

               
        <Container disableGutters>

            <table style={{'width': 100 + '%', 'table-layout': 'fixed'}}>

                <TableHead >
                    <TableRow>
                    <TableCell style={{'width': 30 + 'px', 'padding-left': 0 + 'px'}} ></TableCell>

                    <TableCell>
                                                Quantity

                        
                    </TableCell>
                    <TableCell>
                                                Packing

                        
                    </TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell style={{'width': 40 + 'px'}} ></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    {createTableRows(rowsArray)}

                </TableBody>
            </table>

            {/* <Label htmlFor="input1">Total Price</Label> */}

            {/* <Input type='submit' /> */}
            <Button type='submit' variant="contained">Submit</Button>



        </Container>

        
        </form>

    )
}

export default withRouter(NewOrder);