import React, {Component} from 'react';

import {cards, suits, loadDeck, shuffle} from '../../Utils/deck';
import getCardJSX from '../../Components/card';
import ScoreHistory from '../../Components/scoreHistory';



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

    getBanker3dCard = (playerCards, bankerCards, deck) => {
        let score = this.getScore(playerCards, bankerCards);
        // If Player has a natural no card is drawn ￼￼
        if(score.playerScore == 8 ||score.playerScore == 9 ){
            return null;
        }
        // If Player has not drawn then Banker plays as per Player rules
        if(playerCards.length == 2){
            if(score.bankerScore < 5){
                return deck.shift();
            }
            else return null;
        }
        if(score.bankerScore < 2){
            return deck.shift();
        }
        if(score.bankerScore == 3){
            if(playerCards[2] && playerCards[2].Value != 8){
                return deck.shift(); 
            }
        }
        if(score.bankerScore == 4){
            if(playerCards[2] && 
                playerCards[2].Value != '10' &&
                playerCards[2].Value != 'J' &&
                playerCards[2].Value != 'Q' &&
                playerCards[2].Value != 'K' &&
                playerCards[2].Value != '1' && 
                playerCards[2].Value != '8' && 
                playerCards[2].Value != '9'){
                return deck.shift(); 
            }
        }
        if(score.bankerScore == 5){
            if(playerCards[2] && 
                playerCards[2].Value != '10' &&
                playerCards[2].Value != 'J' &&
                playerCards[2].Value != 'Q' &&
                playerCards[2].Value != 'K' &&
                playerCards[2].Value != '1' && 
                playerCards[2].Value != '2' && 
                playerCards[2].Value != '3' && 
                playerCards[2].Value != '8' && 
                playerCards[2].Value != '9'){
                return deck.shift(); 
            }
        }
        if(score.bankerScore == 6){
            if(playerCards[2] && 
                playerCards[2].Value != '6' &&
                playerCards[2].Value != '7' ){
                return null; 
            } else {
                return deck.shift();
            }
        }
        return null;
    }

    getPlayer3dCard = (playerCards, bankerCards, deck) => {
        let score = this.getScore(playerCards, bankerCards);
        // If Banker has a natural no card is drawn 
        if(score.bankerScore == 8 ||score.bankerScore == 9 ){
            return null;
        }
        if(score.playerScore < 5){
            return deck.shift();
        }
        return null;
    }

    deal = () => {
        if(this.state.deck.length < 6){
            return;
        }

        let deck = this.state.deck.slice();
        let usedCards = this.state.usedCards.slice();
        let scoreHistory = this.state.scoreHistory.slice();
        
        usedCards = usedCards.concat(this.state.playerCards).concat(this.state.bankerCards);
        let playerCards = [];
        let bankerCards = [];

        for(let x = 0; x < 4; x++){
            let dealtCard = deck.shift();
            if(dealtCard){
                if(x < 2){
                    playerCards.push(dealtCard);
                } else {
                    bankerCards.push(dealtCard);
                }
            }
        }

        let player3rdCard = this.getPlayer3dCard(playerCards, bankerCards, deck);
        if(player3rdCard){
            playerCards.push(player3rdCard);
        }
        let banker3DCard = this.getBanker3dCard(playerCards, bankerCards, deck);
        if(banker3DCard){
            bankerCards.push(banker3DCard);
        }

        let currentScore = this.getScore(playerCards, bankerCards);
        scoreHistory.push(currentScore);

        this.setState({
            deck : deck,
            bankerCards : bankerCards,
            playerCards : playerCards,
            usedCards : usedCards,
            currentScore : currentScore,
            scoreHistory : scoreHistory
        })
        
    }

    getSumOfDigits = (n) => {
        let reducer = (accumulatedValue,x) => {
            return accumulatedValue + parseInt(x)
        }
        return (n + "").split('').reduce(reducer, 0);
    }

    getScore = (playerCards, bankerCards) => {
        let playerScore = 0;
        let bankerScore = 0;

        let reducer = (accumulatedValue, currentCard) => {
            if(!["10", "J", "Q", "K"].includes(currentCard.Value)){
                if(currentCard.Value == 'A'){
                    accumulatedValue = accumulatedValue + 1;
                } else {
                    accumulatedValue = accumulatedValue + parseInt(currentCard.Value);
                }
            }
            return accumulatedValue;
        }

        playerScore = playerCards.reduce(reducer,0);
        bankerScore = bankerCards.reduce(reducer,0);

        if(playerScore > 9){
            playerScore = this.getSumOfDigits(playerScore);
        }
        if(bankerScore > 9){
            bankerScore =this.getSumOfDigits(bankerScore);
        }

        return {
            playerScore,
            bankerScore,
        }
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