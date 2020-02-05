import React, {Component} from "react";
import {analysisChartGroup as AnalysisChartGroup, analysisChartStack as AnalysisChartStack} from '../../Components/baccaratSimulationsChart';

class BaccaratChartSet extends Component{

    getDataList = () => {
        let dataList = [];
        let singletonData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index, 
                 
                y0 : analysis.numberOfSingletons
            }
        }) 
    
        let playerWinsData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index, 
                 
                y : analysis.numberOfPlayerWins
            }
        })
    
        let bankerWinsData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index,
                  
                y : analysis.numberOfBankerWins
            }
        }) 
    
        let tiesData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index, 
                 
                y : analysis.numberOfTies
            }
        })  

        dataList.push(singletonData);
        dataList.push(tiesData);
        dataList.push(playerWinsData);
        dataList.push(bankerWinsData);

        return dataList;
    }

    render() {
        let singletonData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index, 
                y : totalHands, 
                y0 : analysis.numberOfSingletons
            }
        }) 
    
        let playerWinsData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index, 
                y : totalHands, 
                y0 : analysis.numberOfPlayerWins
            }
        })
    
        let bankerWinsData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index,
                y : totalHands,  
                y0 : analysis.numberOfBankerWins
            }
        }) 
    
        let tiesData = this.props.state.analysisList.map((analysis, index) => {
            let totalHands = analysis.numberOfSingletons + analysis.numberOfTies + analysis.numberOfBankerWins + analysis.numberOfPlayerWins;
            return {
                x : index, 
                y : totalHands, 
                y0 : analysis.numberOfTies
            }
        })     
        
        // let dataList = this.getDataList();
        
         
        return (
            <div className="container">
                {/* <div className="row">
                    <div className="col">
                        <div class="card">
                            <div class="card-header">
                                All Data
                            </div>
                        </div>
                        <AnalysisChartStack dataList={dataList} />
                    </div>
                </div> */}
                <div className="row mt-5">
                    <div className="col">
                        <div class="card">
                            <div class="card-header">
                                Singletons
                            </div>
                            <AnalysisChartGroup data={singletonData} />
                        </div>                         
                    </div>
                    <div className="col">
                        <div class="card">
                            <div class="card-header">
                                Ties
                            </div>
                            <AnalysisChartGroup data={tiesData} />
                        </div>                        
                    </div>
                    <div className="col">
                        <div class="card">
                            <div class="card-header">
                                Player
                            </div>
                            <AnalysisChartGroup data={playerWinsData} />
                        </div>                        
                    </div>
                    <div className="col">
                        <div class="card">
                            <div class="card-header">
                                Banker
                            </div>
                            <AnalysisChartGroup data={bankerWinsData} />
                        </div>                         
                        
                    </div>                                                            
                </div>
            </div>
        )
    }
}

export default BaccaratChartSet;