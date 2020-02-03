import React from 'react';

const getLongestArrayLength = (array2D) => {
    let max = 0;
    for(let x = 0; x < array2D.length; x++){
        if(array2D[x].length > max){
            max = array2D[x].length;
        }
    }
    return max;
}

const entityCount = (entityCode, scoreArray2D) => {
    const arrayEntityCounterReducer = (acc, entry) => {
        if(entry == entityCode){
            acc++;
        }
        return acc;
    }
    const entityCounterReducer = (acc, arr) => {
        acc = acc + arr.reduce(arrayEntityCounterReducer, 0);
        return acc;
    }
    const numberOfEntities = scoreArray2D.reduce(entityCounterReducer, 0);
    return numberOfEntities;
}

const getAnalysisJSX = (scoreArray2D, props) => {
    const numberOfSingletons = scoreArray2D.filter((arr) => arr.length == 1).length;
    const numberOfTies = entityCount('T',scoreArray2D);
    const numberOfPlayerWins = entityCount('P',scoreArray2D);
    const numberOfBankerWins = entityCount('B',scoreArray2D);
    return (
                <div class="card">
                    <div class="card-header h5">Analysis</div>
                    <div className="container pb-2">
                        <div className="row mt-2">
                            <div className="col">
                            <ul class="list-group">
                                <li class="list-group-item">switches {scoreArray2D.length}</li>
                                <li class="list-group-item">hands {props.scoreHistory.length}</li>
                                <li class="list-group-item">singletons {numberOfSingletons}</li>
                            </ul>
                            </div>
                            <div className="col">
                            <ul class="list-group">
                                <li class="list-group-item">ties {numberOfTies}</li>
                                <li class="list-group-item">Player wins {numberOfPlayerWins}</li>
                                <li class="list-group-item">Banker wins {numberOfBankerWins}</li>                    
                            </ul> 
                            </div>                            
                        </div>
                    </div>
                </div>        
    )
    
}

const getScoreArray2D = (props) => {
    let scoreArray1D = props.scoreHistory.map((score) => {
        if(score.playerScore > score.bankerScore){
            return 'P';
        }
        if(score.playerScore < score.bankerScore){
            return 'B';
        }
        return 'T';
    });
    let scoreArray2D = [];
    let newArray = [];
    for(let x = 0; x < scoreArray1D.length; x++){
        if(x == 0){
            newArray.push(scoreArray1D[x]);
            continue;
        }
        if(scoreArray1D[x] == scoreArray1D[x-1]){
            newArray.push(scoreArray1D[x]);
        }
        else {
            scoreArray2D.push(newArray.slice());
            newArray = [];
            newArray.push(scoreArray1D[x]);
        }
    }
    if(newArray.length){
        scoreArray2D.push(newArray);
    }
    return scoreArray2D;
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
    let scoreArray2D = getScoreArray2D(props);

    return (
        <React.Fragment>
            {getAnalysisJSX(scoreArray2D, props)}
            {getScoreCardJSX(scoreArray2D)}
        </React.Fragment>
    )
}


export default scoreHistory;