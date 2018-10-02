//
//
// JackBlack Game
// Created by Christine Samarchi
//
//



//Deck Class
class Deck {
  //Creates a Deck Object
  //This constructor provides default values for the suits and values properties and an empty array value for cards
  constructor() {
    this.suits = ['spades', 'hearts', 'clubs', 'diamonds'];
    this.values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    this.cards = []
  }

  //Method to Loop through and create all 52 cards for a deck and store them in the "cards" property
  createDeck() {
    for (let i = 0; i < this.suits.length; i++) {
      for (let x = 0; x < this.values.length; x++) {
        let fileName = 'css/cards/' + this.values[x] + '-' + this.suits[i] + '.jpg';
        this.cards.push(new Card(this.values[x], this.suits[i], fileName))
      }
    }
  }

  //Method to shuffle the cards
  shuffleCards() {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor((Math.random() * this.cards.length));
      let location2 = Math.floor((Math.random() * this.cards.length));
      let tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }

  //Method to display images
  imgElement() {
    for (let i = 0; i < this.cards.length; i++) {
      let image = document.createElement('img')
      image.src = this.cards[i].fileName;
      image.style.height = '120px'
      image.style.width = '100px'
      $('.deal').one('click', () => {
        deck.createDeck()
        deck.shuffleCards()
        //$('.deck').append(image);

      })
    }
  }
}



//Card Class
class Card {
  //Creates a Card Object
  //Constructor that requires a value and suit to create a Card Object
  constructor(value, suit, fileName) {
    this.value = value
    this.suit = suit
    this.fileName = fileName
  }
}


class Player {
  constructor(hand) {
    this.hand = hand
  }
}


class Dealer {
  constructor(hand) {
    this.hand = hand
  }
}

class Hand {
  constructor(cards)
}

class Game {

}




















//Call new deck and create the cards
let deck = new Deck()
deck.createDeck()
deck.shuffleCards()
deck.imgElement()


//Log cards to console
console.log(deck.cards)
