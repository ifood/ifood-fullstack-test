import React from 'react';
import 'fontsource-roboto';
import './App.css';

import Filters from '../../components/Filters';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Filters title={'Orders List'} />
      </header>
    </div>
  );
};

export default App;
