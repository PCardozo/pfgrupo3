import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Grid } from '@mui/material';
import Title from './Title';
import {DeleteForever} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts, deleteProduct } from '../../redux/actions/getProductsA';



function preventDefault(event) {
  event.preventDefault();
}

export default function ProductTable() {
  let {allProducts} = useSelector(state => state.products)
  let dispatch = useDispatch()
  let [index, setIndex] = React.useState(3)
  let products = allProducts.slice(0, index)


  React.useEffect(() => {
    if(allProducts.length === 0) {
      dispatch(getAllProducts())
    }
    
  },[allProducts])

    
  function seeMoreProducts() {
    setIndex(index + 3)
  }

  function seeLessProducts() {
    if(index <= 3) {
      setIndex(3)
    }
    else {
      setIndex(index - 3)
    }
  }
  function deleteProductfn(id) {
    dispatch(deleteProduct(id))
    setTimeout(() => {
      dispatch(getAllProducts())
    },500)
  }
  return (
    <React.Fragment>
      <Title>Products</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Sales</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Total earnings</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
                <TableCell align="center">{(p.name)}</TableCell>
              <TableCell align="center">{p.stock}</TableCell>
              <TableCell align="center">{0}</TableCell>
              <TableCell align="center">{p.price}</TableCell>
              <TableCell align="center">${0}</TableCell>
              <TableCell align='center'>
                <IconButton onClick={() => deleteProductfn(p.id)} size='small'>
                  <DeleteForever fontSize='small' color='error'/>
                </IconButton>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
     <Grid direction={`row`}>
     <Button color="primary"  onClick={() => seeMoreProducts()} >
        See more orders
      </Button>
      <Button color="primary" onClick={() => seeLessProducts()} >
        See less orders
      </Button>
     </Grid>
    </React.Fragment>
  );
}