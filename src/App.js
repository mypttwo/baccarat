import React, {Component} from 'react';
import './App.css';
import Baccarat from './Containers/Baccarat/baccarat';
import themes from './Utils/themes';


class App extends Component {
  state = {
    stylePath : themes['pulse'].url
  }

  render(){
    return (
      <React.Fragment>
        <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
        <div className="App">
          <Baccarat></Baccarat>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
