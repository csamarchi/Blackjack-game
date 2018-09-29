//Declaring Variables
let deck = new Array();
let suits = ['spades', 'hearts', 'clubs', 'diamonds'];
let values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'King', 'Queen'];

//Create The Deck
const getDeck = () => {

  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {

    for (let x = 0; x < values.length; x++) {

      let card = {Value: values[i], Suit: suits[x]};

      deck.push(card)
    }
  }
  return deck;
}

console.log(getDeck());
