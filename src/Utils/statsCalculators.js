
const getUpdatedStats = (stats, count, analysis, dataPoint) => {

    if(count == 0){
        return {
            high : analysis[dataPoint],
            low : analysis[dataPoint],
            average : analysis[dataPoint]
        }
    }

    let updatedStats = {
        high : 0,
        low : 0,
        average : 0
    }

    if(analysis[dataPoint] > stats.high){
        updatedStats.high = analysis[dataPoint]
    } else {
        updatedStats.high = stats.high;
    }
    if(analysis[dataPoint] < stats.low){
        updatedStats.low = analysis[dataPoint];
    } else {
        updatedStats.low = stats.low;
    }
    updatedStats.average = (count * stats.average + analysis[dataPoint])/(count +1);
    
    return updatedStats;
}

export {getUpdatedStats};