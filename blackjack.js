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
		this.gameOver = false;
	}

	dealInitialCards() {
		for (let i = 0; i < 2; i++) {
			for (let player of this.players) {
				player.hit(this.deck);
			}
			this.dealer.hit(this.deck);
		}

		this.updateUI(); // Update UI after dealing cards
	}

	hit(playerIndex) {
		const player = this.players[playerIndex];
		player.hit(this.deck);
		this.updateUI();

		if (player.score > 21) {
			player.isBusted = true;

			this.updateUI();
			// Update UI to indicate bust
		}
	}

	stand(playerIndex) {
		this.players[playerIndex].stand();
		this.nextPlayer();
	}

	nextPlayer() {
		this.currentPlayerIndex++;
		if (this.currentPlayerIndex >= this.players.length) {
			this.currentPlayerIndex = 0;
		}
	}

	dealerTurn() {
		while (this.dealer.score < 17) {
			this.dealer.hit(this.deck);
			// Update UI to show dealer's cards
		}
		// Update UI to show dealer's final score
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
	// Consider edge cases like blackjack, push, and busts
	// Update UI to display the game outcome
	}

	function updatePlayerHand(player) {
		const playerHandElement = document.getElementById('player-hand');
		playerHandElement.innerHTML = '';

		player.hand.forEach(card => {
			const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.textContent = `${card.rank} of ${card.suit}`;  
			// Replace with image later
			
			playerHandElement.appendChild(cardElement);
		});
	}

	function updateDealerHand(dealer) {
		const dealerHandElement = document.getElementById('dealer-hand');
		dealerHandElement.innerHTML = '';

		dealer.hand.forEach((card, index) => {
			const cardElement = document.createElement('div');
			cardElement.classList.add('card');

			if (index === 0 && !dealer.isStanding) {
				cardElement.textContent = 'Hidden'; // Show first card as hidden until dealer stands
			} else {
				cardElement.textContent = `${card.rank} of ${card.suit}`;
			}

			dealerHandElement.appendChild(cardElement);
			});
	}

	function updateScores() {
		const playerScoreElement = document.getElementById('player-score');
		const dealerScoreElement = document.getElementById('dealer-score');  


		playerScoreElement.textContent = game.players[game.currentPlayerIndex].score;
		dealerScoreElement.textContent = game.dealer.score;
	}

	function updateGameStatus() {
		const gameStatusElement = document.getElementById('game-status');

		let statusText = '';

		if (game.currentPlayerIndex < game.players.length) {
			statusText = `Player ${game.currentPlayerIndex + 1}'s turn`;
		} else if (game.dealer.isBusted) {
			statusText = 'Dealer busts! You win!';
		} else if (game.players[game.currentPlayerIndex].isBusted) {
			statusText = 'You busted!';
		} else {
			// Implement logic to determine winner based on scores
		}

		gameStatusElement.textContent = statusText;
	}

// Game initialization
const game = new BlackjackGame(1); // Replace 1 with desired number of players

// ... game logic and UI updates