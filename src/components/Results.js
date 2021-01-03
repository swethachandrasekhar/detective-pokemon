import React, { Component } from "react";
import redX from "../assets/redX.png";
import greenCirc from "../assets/vert.svg";


class Results extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  resetGame = (flag) => {
    this.props.resetGame('')
    console.log('reset');
  }

  render() {
    // If the flag is not set, do not display results 
    //Otherwise display appropriate results
    if (this.props.isSuccessfulFlag === "") {
      return null;
    } else if (this.props.isSuccessfulFlag === false) {
      return (
        <div className="resultsSection">
          <h3>DANG, {this.props.userName}...</h3>

          <p>
            <span className="resultPokeName">
              {this.props.capitalizeFirstLetter(this.props.chosenPokeName)}
            </span>{" "}
            was not able to figure out a crime about{" "}
            <span className="resultCrimeName">{this.props.selectedCrime}</span>
          </p>

          <div className="resultsImagesDiv loser">
            <img
              src={this.props.chosenPokeImageUrl}
              alt={this.props.userName}
            />
            <img src={redX} alt="a red X" className="redX" />
          </div>

          <div className="gameButtons">
            <button className="again" onClick={this.props.playAgain}>
              Play again
            </button>
            <button className="again" onClick={this.resetGame}>
              Game restart
            </button>
          </div>
          {/* <div className="again">
            <p onClick={this.resetGame}>Play again?</p>
            <button>reset game</button>
          </div> */}
        </div>
      );
    } else {
      return (
        <div className="resultsSection">
          <h3>OKAYY {this.props.userName}!</h3>

          <p>
            Great job!{" "}
            <span className="resultPokeName">
              {this.props.capitalizeFirstLetter(this.props.chosenPokeName)}
            </span>{" "}
            had what it took to figure out a crime about{" "}
            <span className="resultCrimeName">{this.props.selectedCrime}</span>!
          </p>

          <div className="resultsImagesDiv winner">
            <img
              src={this.props.chosenPokeImageUrl}
              alt={this.props.userName}
            />
            {/* <img src={greenCirc} alt="a green circle" class="greenCirc"/> */}
          </div>

          <div className="gameButtons">
            <button className="again" onClick={this.props.playAgain}>
              Play again
            </button>
            <button className="again" onClick={this.resetGame}>
              Game restart
            </button>
          </div>
          {/* <div className="again">
            <p onClick={this.resetGame}>Play again?</p>
            <button>reset game</button>
          </div> */}
        </div>
      );
    }
  }
}

export default Results;
