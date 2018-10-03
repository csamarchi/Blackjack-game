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
      $('.player').append(image);

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



//Player Class
class Player {
  constructor() {
    this.hand = new Hand()
    this.score = 0
  }

  addCardToHand(card) {
    this.hand.addCard(card)
  }
}

//Dealer Class
class Dealer {
  constructor() {
    this.hand = new Hand()
    this.score = 0
  }

  addCardToHand(card) {
    this.hand.addCard(card)
  }
}

//Hand Class
class Hand {
  constructor() {
    this.cards = []
  }

  addCard(card) {
    this.cards.push(card)
  }
}

//Game Class
class Game {
  constructor() {
    this.player = new Player()
    this.dealer = new Dealer()
    this.deck = new Deck()
    this.gameIsStillBeingPlayed = true;
  }

  startGame() {
    this.createAndShuffleDeck()
    this.dealCards()

    this.playerImgElement()
    this.dealerImgElement()
  }

  createAndShuffleDeck() {
    this.deck.createDeck()
    this.deck.shuffleCards()
  }


  dealCards() {
    let cards = this.deck.cards
    for (let i = 0; i < 2; i++) {
      let card1 = cards.pop()
      let card2 = cards.pop()
      this.player.addCardToHand(card1)
      this.dealer.addCardToHand(card2)
    }
    console.log(this.player.hand.cards);
    console.log(this.dealer.hand.cards);
    console.log(cards);
    this.sumCards(this.dealer)
    this.sumCards(this.player)
  }

  convertValue(value) {
    if (value == "jack" || value == "queen" || value == "king") {
      return 10
    } else if (value == "ace") {
      return 11
    } else {
      return parseInt(value)
    }
  }

  sumCards(player) {
    let aces = 0;
    let sum = 0;
    for (let card of player.hand.cards) {
      let value = this.convertValue(card.value);
      // player.score += this.convertValue(card.value);
      if (value === 11) {
        aces += 1
        sum += value
      } else {
        sum += value
      }
    }
    while (aces > 0 && sum > 21) {
      aces -= 1
      sum -= 10
    }
    player.score = sum
  }

  calculateBust(player) {
    if (player.score > 21) {
      this.gameIsStillBeingPlayed = false; //game over
      alert('BUSTED');
    }
  }


  playerHit() {
    let card = this.deck.cards.pop()
    this.player.addCardToHand(card)

    //Display
    $('.player').empty();
    this.playerImgElement()

    //Calculation
    this.sumCards(this.player)
    this.calculateBust(this.player)

    //debugging
    console.log(this.player.hand.cards);
  }

  playerStay() {
    this.sumCards(this.dealer)
    this.sumCards(this.player)

    $('.d').find('*').not('.d').empty();

    if (this.dealer.score < 17) {
      this.dealerHit()
    } else {
      this.compareScores()
    }
  }

  dealerHit() {
    let card = this.deck.cards.pop()
    this.dealer.addCardToHand(card)

    //Display
    $('.dealer').empty();
    this.dealerImgElement()
  }

  compareScores() {
    if (this.player.score > this.dealer.score) {
      alert("You Won");
    } else {
      alert("Dealer Won");
    }
  }

  playerImgElement() {
    for (let i = 0; i < this.player.hand.cards.length; i++) {
      let image = document.createElement('img')
      image.src = this.player.hand.cards[i].fileName
      image.style.height = '180px'
      image.style.width = '160px'
      image.style.padding = '10px'
      $('.player').append(image);
    }
  }

  dealerImgElement() {
    for (let i = 0; i < this.dealer.hand.cards.length; i++) {
      let image2 = document.createElement('img');
      image2.src = this.dealer.hand.cards[i].fileName
      image2.style.height = '180px'
      image2.style.width = '160px'
      image2.style.padding = '10px'
      $('.dealer').append(image2);
    }
  }
}

//
// $('.blue-pokerchip').on('click', () =>{
//
// })
//
// function increasePot() {
//
// }



///////Start Game////////

let game = new Game()
$('.deal').one('click', () => {
  game.startGame()
  console.log(game.dealer.score);
  //$('.d').append('<p>' + game.dealer.score + '</p>');
  $('.player').append('<p>' + game.player.score + '</p>');
})
$('.hit').on('click', () => {
  if (game.gameIsStillBeingPlayed == true) {
    game.playerHit()
    $('.player').append('<p>' + game.player.score + '</p>');

  }
})
$('.stay').on('click', () => {
  if (game.gameIsStillBeingPlayed == true) {
    game.playerStay()
    $('.d').append('<h4>' + game.dealer.score + '</h4>');
    //$('.d').find('.h4').not('.d').empty();
  }
})

///////Start Game////////
