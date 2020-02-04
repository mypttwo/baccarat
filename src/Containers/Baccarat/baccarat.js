import React, {Component} from 'react';

import {cards, suits, loadDeck, shuffle} from '../../Utils/deck';
import getCardJSX from '../../Components/card';
import {scoreHistory as ScoreHistory} from '../../Components/scoreHistory';
import executeDeal from '../../Utils/dealEngine';



class Baccarat extends Component{
    state = {
        deck : [],
        bankerCards : [],
        playerCards : [],
        usedCards : [],
        currentScore : {
            playerScore : 0,
            bankerScore : 0
        },
        scoreHistory : []
    }

    componentDidMount(){
        this.newShoe();
    }

    newShoe = () => {
        let completeDeck = loadDeck(8);
        
        this.setState({
            deck : completeDeck
        })
    }
  

    deal = () => {
        if(this.state.deck.length < 6){
            return;
        }

        let deck = this.state.deck.slice();
        let usedCards = this.state.usedCards.slice();
        let scoreHistory = this.state.scoreHistory.slice();
        
        usedCards = usedCards.concat(this.state.playerCards).concat(this.state.bankerCards);

        let dealResult = executeDeal({
            deck,
            scoreHistory
        })

        this.setState({
            deck : dealResult.deck,
            bankerCards : dealResult.bankerCards,
            playerCards : dealResult.playerCards,
            usedCards : usedCards,
            currentScore : dealResult.currentScore,
            scoreHistory : dealResult.scoreHistory
        })
    }

    getUsedCardsJSX = () => {
        return (
            <React.Fragment>
                <div class="card text-center">
                    <div class="card-header h5">
                        Used Cards
                    </div>
                    <div class="card-body">
                        {this.state.usedCards.map(getCardJSX)}
                    </div>
                </div>
            </React.Fragment>          
        )
    }

    getHandFor = (entity) => {
        let header = 'Banker';
        let score = this.state.currentScore.bankerScore;
        let cardJSX = this.state.bankerCards.map(getCardJSX);
        if(entity === 'P'){
            header = 'Player';
            score = this.state.currentScore.playerScore;
            cardJSX = this.state.playerCards.map(getCardJSX);
        }

        return (
            <div class="card text-center">
                <div class="card-header h6">{header}</div>
            <div class="card-body">
                <p class="card-text h6">{score}</p>
                <div>{cardJSX}</div>
            </div>                             
        </div>            
        )
    }

    render(){
            return (
                <React.Fragment>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm pt-5'>
                                <div class="btn-group" role="group">
                                    <button type="button" className="btn btn-success" onClick={this.deal}>Deal!</button>
                                    <button type="button" className="btn btn-secondary
                                    " onClick={this.newShoe}>New Shoe</button>
                                </div>
                                <div>                          
                                </div>
                            </div>                            
                        </div>     
                        <div className="row pt-5">
                            <div className="col">{this.getHandFor('P')}</div>
                            <div className="col">{this.getHandFor('B')}</div>                            
                        </div>  
                        <div className="row pt-5">
                            <div className="col">
                            <ScoreHistory scoreHistory={this.state.scoreHistory}></ScoreHistory>
                            </div>
                        </div> 
                        <div className="row pt-5">
                            <div className="col">
                            {this.getUsedCardsJSX()} 
                            </div>
                        </div>                                                                
                    </div>
                </React.Fragment>
                
                ) 
    }
}

export default Baccarat;