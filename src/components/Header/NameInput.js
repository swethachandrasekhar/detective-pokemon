import { Component } from "react";
import Ball from "../Ball.js";
class NameInput extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
    };
  }

// Function to store user's name input 
  handleChange = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };

//Function to handle input submission 
//Store the name in App.js state
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.userInput(this.state.userName);
  };

  render() {
    return (
      <form name="userName" className="userNameForm">
        <label htmlFor="nameInput">
          Your name:
          <Ball displayClass="ball" />
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="nameInput"
          id="nameInput"
        />

        <button className="nameButton" onClick={this.handleSubmit}>
          {" "}
          Submit
        </button>
      </form>
    );
  }
}

export default NameInput;
