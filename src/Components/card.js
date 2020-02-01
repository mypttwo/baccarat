import React from 'react';

const getCardJSX = (card) => {
    return (
            <div className='card'>
                <div className='value'>{card.Value}</div>
                <div className={'suit ' + card.Suit}></div>
            </div>            
    )
}

export default getCardJSX;
