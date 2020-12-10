import { Component } from "react";
import NameInput from "./NameInput.js";

class Header extends Component {
  getUsername = (name) => {
    this.props.getUser(name);
  };

  render() {
    return (
      <>
        <header>
          <div className="wrapper">
            {/* App name */}
            <h1>Detective Pokémon</h1>

            {/* Game rules  */}
            <article className="introText">
              <p>
                It is dark times out there. In this new world, Pokémon come to
                rescue and support the UK law enforcement.
              </p>
              <p>
                Pick a Pokemon that is best suited to help you solve a crime.
                Each pokemon has different abilities that can help them solve
                different categories of crime.
              </p>
            </article>

            {/* Component to accept user's name  */}
            <NameInput userInput={this.getUsername} />

            {this.props.username.length >= 2 ? (
              <p>
                Thank you{" "}
                <span>
                  {this.props.username} for joining this fight with us!
                </span>
              </p>
            ) : null}
          </div>
        </header>
      </>
    );
  }
}

export default Header;
