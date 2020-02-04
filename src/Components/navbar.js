import React from 'react';

import themes from '../Utils/themes';

const setTheme = (key, props) => {
    console.log(themes[key].url);
    props.onChangeTheme(themes[key].url);    
  }

const getThemesJSX = (props) => {
    if(themes){
      return Object.keys(themes).map((theme) => {
      return <a key={theme} href="#" className="dropdown-item" onClick={() => setTheme(theme, props)}>{themes[theme].name}</a>
      })
    }
  }

const navbar = (props) => {
    return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Big Daddy</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#" onClick={props.handleHomeClick}>Home </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                    Themes
                    </a>
                    <div class="dropdown-menu" >
                    {getThemesJSX(props)}
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                    Baccarat
                    </a>
                    <div class="dropdown-menu" >
                    <a class="dropdown-item" href="#" onClick={props.handlePlayBaccaratClick}>Play</a>
                    <a class="dropdown-item" href="#" onClick={props.handleRunSimulationsBaccaratClick}>Run Simulations</a>
                    </div>
                </li>
                
                </ul>
                
            </div>
            </nav>
    )
}

export default navbar;