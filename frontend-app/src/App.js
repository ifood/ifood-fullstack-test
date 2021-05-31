import React, { Component } from "react";

import Header from "./routes/Header";
import Main from "./routes/Main";

class App extends Component {
  render() {
    console.log(`REACT_APP_API_URL: ${JSON.stringify(process.env)}`)
    return (
      <div className="main-view">
        <Header/>
        <Main/>  
      </div>
    );
  }
}

export default App;
