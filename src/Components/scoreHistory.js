import React from 'react';

import {getScoreArray2D, getAnalysis} from '../Utils/scoreAnalysis';

const getAnalysisJSX = (scoreArray2D, props) => {

    let analysis = getAnalysis(scoreArray2D);

    return (
            <div class="card">
                <div class="card-header h5">Analysis</div>
                <div className="container pb-2">
                    <div className="row mt-2">
                        <div className="col">
                        <ul class="list-group">
                            <li class="list-group-item">switches {scoreArray2D.length}</li>
                            <li class="list-group-item">hands {props.scoreHistory.length}</li>
                            <li class="list-group-item">singletons {analysis.numberOfSingletons}</li>
                        </ul>
                        </div>
                        <div className="col">
                        <ul class="list-group">
                            <li class="list-group-item">ties {analysis.numberOfTies}</li>
                            <li class="list-group-item">Player wins {analysis.numberOfPlayerWins}</li>
                            <li class="list-group-item">Banker wins {analysis.numberOfBankerWins}</li>                    
                        </ul> 
                        </div>                            
                    </div>
                </div>
            </div>        
    )
}

const getLongestArrayLength = (array2D) => {
    let max = 0;
    for(let x = 0; x < array2D.length; x++){
        if(array2D[x].length > max){
            max = array2D[x].length;
        }
    }
    return max;
}

const getScoreCardJSX = (scoreArray2D) => {
    let maxLength = getLongestArrayLength(scoreArray2D);

    let strArr = [];
    for(let x = 0; x < maxLength; x++){
        let str = '';
        for(let y = 0; y < scoreArray2D.length; y++){
            if(scoreArray2D[y].length > x){
                str = str + scoreArray2D[y][x]
            } else {
                str = str + "x"
            }
        }
        strArr.push(str);
    }
    let jsx = strArr.map((str, x) => {
        let rowJsx = str.split('').map((char,y) => {
            if(char != 'x'){
                return <td className='border p-2 ' key={y}>{char}</td>
            } else {
                return <td className='border p-2 ' key={y}></td>
            }
            
        })
        return <tr key={x}>{rowJsx}</tr>
    })
    
    return (
        <React.Fragment>
            <div class="card text-center mt-5">
            <div class="card-header h5">
                Score
            </div>
            <div class="card-body">
            <div className='scoreBox'>
                <table className='table-sm'>
                    <tbody>{jsx}</tbody>
                </table>
            </div>
            </div>
            </div>            
            
        </React.Fragment>
    )
}

const scoreHistory = (props) => {
    let scoreArray2D = getScoreArray2D(props.scoreHistory);

    return (
        <React.Fragment>
            {getAnalysisJSX(scoreArray2D, props)}
            {getScoreCardJSX(scoreArray2D)}
        </React.Fragment>
    )
}


export {scoreHistory};