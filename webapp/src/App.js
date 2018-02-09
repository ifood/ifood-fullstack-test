import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Search from './components/Search';
import OrderList from './components/OrderList';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Ifood App Maneiro"/>
        <br/>
        <Search />
        <br/>
        <OrderList />
      </MuiThemeProvider>
    );
  }
}

export default App;
