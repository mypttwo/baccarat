// https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["diams", "hearts", "spades", "clubs"];

function getDeck()
{
	let deck = new Array();

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < cards.length; x++)
		{
			let card = {Value: cards[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 10000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];
		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

}


function loadDeck(numberOfPacks)
{
	let completeDeck = [];
	
	for(let x = 0; x < numberOfPacks; x++){
		completeDeck = completeDeck.concat(getDeck());
	}
	
	shuffle(completeDeck);
	//shuffle(completeDeck);
	console.log(completeDeck);
	
    return completeDeck;
}

export {
    cards,
    suits,
    loadDeck,
    shuffle
}

