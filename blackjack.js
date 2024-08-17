const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.value = getCardValue(rank);
    this.flexibleValue = rank === 'Ace';
  }
}

function getCardValue(rank) {
  if (isNaN(rank)) {
    return 10; // Jacks, Queens, Kings
  } else if (rank === 'Ace') {
    return 11; // Ace can be 1 or 11, initially set to 11
  } else {
    return parseInt(rank);
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuffle();
  }

  shuffle() {
    // Fisher-Yates shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  dealCard() {
    return this.cards.pop();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
    this.isBusted = false;
    this.isStanding = false;
  }

  hit(deck) {
    const card = deck.dealCard();
    this.hand.push(card);
    this.score = calculateScore(this.hand);

    if (this.score > 21) {
      this.isBusted = true;
    }
  }

  stand() {
    this.isStanding = true;
  }

  changeAceValue(index) {
    if (this.hand[index].rank === 'Ace' && this.hand[index].flexibleValue) {
      this.score -= 10;
      this.hand[index].flexibleValue = false;
    }
  }
}

class BlackjackGame {
  constructor(numPlayers) {
    this.deck = new Deck();
    this.players = [];
    this.dealer = new Player('Dealer');
    this.currentPlayerIndex = 0;

    for (let i = 0; i < numPlayers; i++) {
      this.players.push(new Player(`Player ${i + 1}`));
    }

    this.dealInitialCards();
  }

  dealInitialCards() {
    for (let i = 0; i < 2; i++) {
      for (let player of this.players) {
        player.hit(this.deck);
      }
      this.dealer.hit(this.deck);
    }
  }

  nextPlayer() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }

  calculateScore(hand) {
    let score = 0;
    let numAces = 0;

    for (const card of hand) {
      score += card.value;
      if (card.rank === 'Ace') {
        numAces++;
      }
    }

    while (score > 21 && numAces > 0) {
      score -= 10;
      numAces--;
    }

    return score;
  }

  checkWinner() {
    // Implement logic to determine the winner based on player and dealer scores
  }

  // ... other game logic functions (e.g., handle player actions, update UI)
}

// Game initialization
const game = new BlackjackGame(1); // Replace 1 with desired number of players

// ... game logic and UI updates