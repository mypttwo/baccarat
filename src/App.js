import React, {Component} from 'react';
import './App.css';
import Baccarat from './Containers/Baccarat/baccarat';

import Home from './Containers/Home/home';


class App extends Component {
  render(){
    return (
      <React.Fragment>
        
        <div className="App">
          <Home />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
