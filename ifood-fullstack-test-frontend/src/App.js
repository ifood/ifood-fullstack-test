import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Paper from '@material-ui/core/Paper';

import HeaderContainer from './containers/HeaderContainer';
import TableContainer from './containers/TableContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<Paper>
          <h1>
        		Order List
        	</h1>
          <HeaderContainer/>
          <TableContainer/>
        </Paper>
      </Provider>
    );
  }
}

export default App;
