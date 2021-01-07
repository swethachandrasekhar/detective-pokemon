import React, { Component } from "react";
import redX from "../assets/redX.png";

class Results extends Component {
  constructor() {
    super();
    this.state = {};
  }

  resetGame = (flag) => {
    this.props.resetGame("");
    console.log("reset");
  };

  render() {
    // If the flag is not set, do not display results
    //Otherwise display appropriate results
    if (this.props.isSuccessfulFlag === "") {
      return null;
    } else if (this.props.isSuccessfulFlag === false) {
      return (
        //success message
        <div className="resultsSection">
          <h3>DANG, {this.props.userName}...</h3>

          <p>
            <span className="resultPokeName">
              {this.props.capitalizeFirstLetter(this.props.chosenPokeName)}
            </span>{" "}
            was not able to solve the crime!!{" "}
          </p>

          <div className="resultsImagesDiv loser">
            <img
              src={this.props.chosenPokeImageUrl}
              alt={this.props.userName}
            />
            <img src={redX} alt="a red X" className="redX" />
          </div>
          {/* options for game restart and play again */}

          <div className="gameButtons">
            <button className="again" onClick={this.props.playAgain}>
              Play again
            </button>
            <button className="again" onClick={this.resetGame}>
              Game restart
            </button>
          </div>
        </div>
      );
    } else {
      return (
        //failure message
        <div className="resultsSection">
          <h3>OKAYY {this.props.userName}!</h3>

          <p>
            Great job!{" "}
            <span className="resultPokeName">
              {this.props.capitalizeFirstLetter(this.props.chosenPokeName)}
            </span>{" "}
            solved the crime!{" "}
          </p>

          <div className="resultsImagesDiv winner">
            <img
              src={this.props.chosenPokeImageUrl}
              alt={this.props.userName}
            />
          </div>
          {/* options for game restart and play again */}
          <div className="gameButtons">
            <button className="again" onClick={this.props.playAgain}>
              Play again
            </button>
            <button className="again" onClick={this.resetGame}>
              Game restart
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Results;
