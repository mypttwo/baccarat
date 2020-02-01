import React, {Component} from 'react';
import './App.css';
import Baccarat from './Containers/Baccarat/baccarat';


class App extends Component {

  render(){
    return (
      <React.Fragment>
        <div className="App">
          <Baccarat></Baccarat>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
