import * as React from 'react';
import  {People ,ShoppingCart, BarChart, Layers, Assignment, Home, Pets, Inventory} from '@mui/icons-material/';
import {Link, useLocation} from 'react-router-dom'
import { ListItemIcon, ListItemButton, ListItemText, ListSubheader } from '@mui/material';


export const mainListItems = (
  <React.Fragment>
    <Link to='/'>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Landing" />
      </ListItemButton>
    </Link>
    <Link to=''>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Dashboard home" />
      </ListItemButton>
    </Link>
    <Link to='animalsAdmin'>
      <ListItemButton>
        <ListItemIcon>
          <Pets />
        </ListItemIcon>
        <ListItemText primary="Animals" />
      </ListItemButton>
    </Link>
    <Link to='productsAdmin'>
    <ListItemButton>
      <ListItemIcon>
        <Inventory/>
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <BarChart />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Layers />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);