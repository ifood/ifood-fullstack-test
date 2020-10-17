import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import reducers from './reducers';
import './assets/css/smacss';
import Home from './pages/Home';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const mainTheme = createMuiTheme({
	palette: {
		primary: {
			main: red[500],
		},
	},
});

const App = () => (
	<ThemeProvider theme={mainTheme}>
		<Provider store={store}>
			<Home />
		</Provider>
	</ThemeProvider>
);

export default App;
