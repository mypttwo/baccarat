const getSumOfDigits = (n) => {
    let reducer = (accumulatedValue,x) => {
        return accumulatedValue + parseInt(x)
    }
    return (n + "").split('').reduce(reducer, 0);
}
const getScore = (playerCards, bankerCards) => {
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
        //playerScore = getSumOfDigits(playerScore);
        playerScore = playerScore - 10;
    }
    if(bankerScore > 9){
        //bankerScore = getSumOfDigits(bankerScore);
        bankerScore = bankerScore -10;
    }

    return {
        playerScore,
        bankerScore,
    }
}

const getBanker3dCard = (playerCards, bankerCards, deck) => {
    let score = getScore(playerCards, bankerCards);
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

const getPlayer3dCard = (playerCards, bankerCards, deck) => {
    let score = getScore(playerCards, bankerCards);
    // If Banker has a natural no card is drawn 
    if(score.bankerScore == 8 ||score.bankerScore == 9 ){
        return null;
    }
    if(score.playerScore < 5){
        return deck.shift();
    }
    return null;
}

const executeDeal = (gameState) => {
    debugger;
    let playerCards = [];
    let bankerCards = [];

    for(let x = 0; x < 4; x++){
        let dealtCard = gameState.deck.shift();
        if(dealtCard){
            if(x < 2){
                playerCards.push(dealtCard);
            } else {
                bankerCards.push(dealtCard);
            }
        }
    }

    let player3rdCard = getPlayer3dCard(playerCards, bankerCards, gameState.deck);
    if(player3rdCard){
        playerCards.push(player3rdCard);
    }
    let banker3DCard = getBanker3dCard(playerCards, bankerCards, gameState.deck);
    if(banker3DCard){
        bankerCards.push(banker3DCard);
    }

    let currentScore = getScore(playerCards, bankerCards);
    gameState.scoreHistory.push(currentScore);

    return {
        deck : gameState.deck,
        playerCards,
        bankerCards,
        currentScore,
        scoreHistory : gameState.scoreHistory
    }
}

export default executeDeal;