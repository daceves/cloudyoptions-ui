import React from 'react';
import './App.css';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <meta name="google-signin-client_id" content="740164561913-sjupbaofgfgtfhsm5ggo6lnqj38akrcm.apps.googleusercontent.com"/>
        <Login/>
      </header> 
    </div>
  );
}

export default App;
