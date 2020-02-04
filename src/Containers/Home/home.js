import React, {Component} from 'react';

import Navbar from '../../Components/navbar';
import themes from '../../Utils/themes';
import HomePage from '../HomePage/homePage';
import Baccarat from '../Baccarat/baccarat';
import BaccaratSimulations from '../BaccaratSimulations/baccaratSimulations';

class Home extends Component{

    HOME = 1;
    PLAY_BACCARAT = 2;
    RUN_SIMULATIONS_BACCARAT = 3;

    state = {
        display : this.HOME,
        stylePath : themes['spacelab'].url
    }

    handleChangeTheme = (themeUrl) => {
        this.setState({
            stylePath : themeUrl
        })
    }

    getDisplayComponent = () => {
        switch (this.state.display) {
            case this.HOME:
                return <HomePage />
            case this.PLAY_BACCARAT:
                    return <Baccarat />        
            default:
                return <BaccaratSimulations /> ;
        }
    }
    handleHomeClick = () => {
        this.setState({
            display : this.HOME
        })
    }
    handlePlayBaccaratClick = () => {
        this.setState({
            display : this.PLAY_BACCARAT
        })
    }
    handleRunSimulationsBaccaratClick = () => {
        this.setState({
            display : this.RUN_SIMULATIONS_BACCARAT
        })
    }

    render(){
        return (
            <React.Fragment>
                <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
                <Navbar 
                onChangeTheme={this.handleChangeTheme}
                handleRunSimulationsBaccaratClick ={this.handleRunSimulationsBaccaratClick}
                handlePlayBaccaratClick={this.handlePlayBaccaratClick}
                handleHomeClick={this.handleHomeClick}
                />
                {this.getDisplayComponent()}
            </React.Fragment>
        )
    }
}

export default Home;