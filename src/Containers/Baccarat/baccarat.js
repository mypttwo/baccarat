import React, {Component} from 'react';

import {cards, suits, loadDeck, shuffle} from '../../Utils/deck';
import getCardJSX from '../../Components/card';
import ScoreHistory from '../../Components/scoreHistory';
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
                            </div>                            
                        </div>                                                
                        <div className='row pt-2'>
                            <div className="col-sm">
                                <div className='col-sm'>Player</div>
                                <div className='col-sm'>{this.state.currentScore.playerScore}</div>
                                {this.state.playerCards.map(getCardJSX)}
                            </div>
                            <div className="col-sm">
                                <div className='col-sm'>Banker</div>
                                <div className='col-sm'>{this.state.currentScore.bankerScore}</div>
                                {this.state.bankerCards.map(getCardJSX)}
                            </div>
                        </div>

                    </div>
                    <div className='container'>
                    <div className='row pt-2'>
                            <div className="col-sm">Score</div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <ScoreHistory scoreHistory={this.state.scoreHistory}></ScoreHistory>
                            </div>                            
                        </div>
                    </div>                    
                    {/* <div className='container'>
                    <div className='row pt-2'>
                            <div className="col-sm">Used cards</div>
                        </div>
                        <div className='row'>
                            <div className="col">{this.state.usedCards.map(getCardJSX)}</div>
                        </div>
                    </div> */}
                </React.Fragment>
                
                ) 
    }
}

export default Baccarat;