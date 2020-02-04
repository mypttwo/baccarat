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

const getScoreArray2D = (scoreHistory) => {
    let scoreArray1D = scoreHistory.map((score) => {
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

const getAnalysis = (scoreArray2D) => {
    return{
        numberOfSingletons : scoreArray2D.filter((arr) => arr.length == 1).length,
        numberOfTies : entityCount('T',scoreArray2D),
        numberOfPlayerWins : entityCount('P',scoreArray2D),
        numberOfBankerWins : entityCount('B',scoreArray2D),
    }
}

export {getScoreArray2D, getAnalysis};