import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import AppBarTop from './AppBarSection/AppBarTop';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3D2809'
    },
    secondary: {
      main: '#1A8A40'
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <meta name="google-signin-client_id" content="740164561913-sjupbaofgfgtfhsm5ggo6lnqj38akrcm.apps.googleusercontent.com"/>
          <AppBarTop/>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
