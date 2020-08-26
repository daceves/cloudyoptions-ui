import React from 'react';
import Login from '../LoginSection/Login';
import AppBar from '@material-ui/core/AppBar'

export default function AppBarTop() {
  return (
    <AppBar color="secondary" position="static">
        <Login/>
    </AppBar>   
  );
}
