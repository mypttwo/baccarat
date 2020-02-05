import React, {Component} from 'react';

import {cards, suits, loadDeck, shuffle} from '../../Utils/deck';
import executeDeal from '../../Utils/dealEngine';
import {getScoreArray2D, getAnalysis} from '../../Utils/scoreAnalysis';
import BaccaratChartSet from '../BaccaratChartSet/baccaratChartSet';
import {getUpdatedStats} from '../../Utils/statsCalculators';

class BaccaratSimulations extends Component{
    state = {
        analysisList : [],
        noOfShoes : 3,
        singletonStats : {
            high : 0,
            low : 1000,
            average : 0
        },
        tieStats : {
            high : 0,
            low : 1000,
            average : 0
        },
        playerWinStats : {
            high : 0,
            low : 1000,
            average : 0
        },
        bankerWinStats : {
            high : 0,
            low : 1000,
            average : 0
        }
    }

    runShoe = () => {

        let deck = loadDeck(8);
        let scoreHistory = [];

        let dealResult = null;
        while(deck.length >= 6){
            dealResult = executeDeal({
                deck,
                scoreHistory
            })
        }
        let scoreArray2D = getScoreArray2D(dealResult.scoreHistory);
        let analysis = getAnalysis(scoreArray2D);

        let analysisList = this.state.analysisList.slice();
        

        let singletonStats = getUpdatedStats(this.state.singletonStats, this.state.analysisList.length, analysis, "numberOfSingletons");
        let tieStats = getUpdatedStats(this.state.tieStats, this.state.analysisList.length, analysis, "numberOfTies");

        let playerWinStats = getUpdatedStats(this.state.playerWinStats, this.state.analysisList.length, analysis, "numberOfPlayerWins");
        let bankerWinStats = getUpdatedStats(this.state.bankerWinStats, this.state.analysisList.length, analysis, "numberOfBankerWins");

        analysisList.push(analysis);

        this.setState(() => {
            return {
                analysisList : analysisList,
                singletonStats : singletonStats,
                tieStats : tieStats,
                playerWinStats : playerWinStats,
                bankerWinStats : bankerWinStats
            };
           });
    }


    getHistoryListJSX = () => {
        let rows = this.state.analysisList.map((analysis, index) => {
            
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{analysis.numberOfSingletons}</td>
                    <td>{analysis.numberOfTies}</td>
                    <td>{analysis.numberOfPlayerWins}</td>
                    <td>{analysis.numberOfBankerWins}</td>
                </tr>
            )
            
        })
        return(
            <table class="table table-bordered">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">Singletons</th>
                    <th scope="col">Ties</th>
                    <th scope="col">Player Wins</th>
                    <th scope="col">Banker Wins</th>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    run = () => {
        this.setState({
            analysisList : []
        })
        for(let x = 0; x < this.state.noOfShoes; x++){
            setTimeout(() => this.runShoe(),0);
            //this.runShoe();
        }
    }

    updateNumberOfShoes = (event) => {
        this.setState({
            noOfShoes : event.target.value
        })
    }

    getStats = () => {
        return (
            <div className="container">
            <div className="row">
                <div className="col">
                    <div class="card-body">
                        <div className="card">
                            <div className="card-header">Singletons</div>
                            <div className="card-body">
                                <div>High : {this.state.singletonStats.high}</div>
                                <div>Av : {this.state.singletonStats.average.toFixed(2)}</div>
                                <div>Low : {this.state.singletonStats.low}</div>
                            </div>
                        </div>
                    </div>                                        
                </div>
                <div className="col">
                    <div class="card-body">
                        <div className="card">
                            <div className="card-header">Ties</div>
                            <div className="card-body">
                                <div>High : {this.state.tieStats.high}</div>
                                <div>Av : {this.state.tieStats.average.toFixed(2)}</div>
                                <div>Low : {this.state.tieStats.low}</div>
                            </div>
                        </div>
                    </div>                                        
                </div>
                <div className="col">
                    <div class="card-body">
                        <div className="card">
                            <div className="card-header">Player Wins</div>
                            <div className="card-body">
                                <div>High : {this.state.playerWinStats.high}</div>
                                <div>Av : {this.state.playerWinStats.average.toFixed(2)}</div>
                                <div>Low : {this.state.playerWinStats.low}</div>
                            </div>
                        </div>
                    </div>                                        
                </div>
                <div className="col">
                    <div class="card-body">
                        <div className="card">
                            <div className="card-header">Banker Wins</div>
                            <div className="card-body">
                                <div>High : {this.state.bankerWinStats.high}</div>
                                <div>Av : {this.state.bankerWinStats.average.toFixed(2)}</div>
                                <div>Low : {this.state.bankerWinStats.low}</div>
                            </div>
                        </div>
                    </div>                                        
                </div>                                                
            </div>
        </div>
        )
    }

    render(){
        return(
            <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <div class="card">
                            <div class="card-header">
                            Simulation Settings
                            </div>
                            <div class="card-body">
                            <form class="form-inline">
                                <div class="form-group mb-2">
                                    <span> Number of Shoes</span>
                                </div>
                                <div class="form-group mx-sm-3 mb-2">
                                    <input type="text" class="form-control" value={this.state.noOfShoes} onChange={this.updateNumberOfShoes} />
                                </div>
                                <button type="button" class="btn btn-primary mb-2" onClick={this.run}>Start!</button>
                            </form>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>  
            <div className="container">
                <div className="row">
                    <div className="col">
                        <BaccaratChartSet state={this.state} />
                    </div>
                </div>

            </div>         
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                    <div class="card">
                            <div class="card-header">
                            Results
                            </div>
                            <div className="card-body">
                                {this.getStats()}
                            </div>                          
                            <div class="card-body">
                                {this.getHistoryListJSX()}                         
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default BaccaratSimulations;