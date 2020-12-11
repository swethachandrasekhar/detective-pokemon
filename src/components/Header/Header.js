import { Component } from "react";
import NameInput from "./NameInput.js";

class Header extends Component {
  getUsername = (name, isSubmit) => {
    this.props.getUser(name, isSubmit);
  };

  render() {
    return (
      <>
        <header>
          <div className="wrapper">

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
          </div>
        </header>
      </>
    );
  }
}

export default Header;
