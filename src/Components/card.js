import React from 'react';

const getSymbolForSuit = (suit) => {
    switch (suit) {
        case 'spades':
            return '♠';
        case 'hearts':
            return '♥'    
        case 'clubs':
            return '♣';
        case 'diams':
            return '♦'                     
        default:
            console.error(`Why am i here ${suit}`);
        return '☠'
    }
}

const getCardJSX = (card) => {
    let className = `pcard ${card.Suit}`;
    
    return ( 
            <div className={className} >
                <span className="rank">{card.Value}</span>
                <span className="suit">{getSymbolForSuit(card.Suit)}</span>
            </div>                      
    )
}

export default getCardJSX;
