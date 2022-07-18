import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      newWinner: 0,
      roundsLeft: 26,
      game: false,
    };
  }

  dealCards = () => {
    // Deal last 2 cards to currCards
    let dealtCurrCards = this.state.cardDeck.slice(-2);
    // store player 1's card & store player 2's card
    let player1Card = dealtCurrCards[0];
    let player2Card = dealtCurrCards[1];
    let gameWinner = 0;

    //Compare the 2 cards after dealt
    // function to compare cards
    // if player 1 wins, add win to player 1, set current winner as player 1, rounds + 1
    // if player 2 wins, add win to player 2, set current winner as player 2, rounds + 1
    // if both players draw, do nothing
    if (player1Card.rank > player2Card.rank) {
      gameWinner = 1;
      this.roundsLeft();
    } else if (player2Card.rank > player1Card.rank) {
      gameWinner = 2;
      this.roundsLeft();
    } else {
      this.roundsLeft();
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      //store the 2 cards
      currCards: dealtCurrCards,
      newWinner: gameWinner,

      // store player 1's score & player 2's score
      // store who is the current winner
      // store number of rounds left
      player1Score:
        this.state.newWinner === 1
          ? this.state.player1Score + 1
          : this.state.player1Score,

      player2Score:
        this.state.newWinner === 2
          ? this.state.player2Score + 1
          : this.state.player2Score,
    }));
  };

  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      game: false,
      roundsLeft: 0,
      player1Score: 0,
      player2Score: 0,
    });
  };

  roundsLeft = () => {
    this.setState({
      roundsLeft: this.state.roundsLeft - 1,
    });
  };

  // after each round, clear the currCards and call shuffleDeck again

  render() {
    //render two cards out
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card</h3>
          {currCardElems}
          <br />
          <button
            onClick={() => {
              this.dealCards();
            }}
          >
            Deal
          </button>
          <p>Player 1 has a score of {this.state.player1Score}</p>
          <p>Player 2 has a score of {this.state.player2Score}</p>
          <p>There are {this.state.roundsLeft} rounds left</p>
          <p>winner is {this.state.newWinner}</p>
        </header>
      </div>
    );
  }
}

export default App;
