import { Component } from "react";
import Ball from "../Ball.js";
class NameInput extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userNameTooSmall: false
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
    
    if (this.state.userName.length > 1) {
      this.props.userInput(this.state.userName, true);
      this.setState({
        userNameTooSmall: false
      })
    } else {
      // 
      
      this.setState({
        userNameTooSmall: true
      })
    }
  };

  render() {
    return (
      <>
        <form name="userName" className="userNameForm">
          <label htmlFor="nameInput">
            Your name:
            {/* <Ball displayClass="ball" /> */}
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="nameInput"
            id="nameInput"
          />

          <button className="nameButton" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>

        {this.state.userNameTooSmall ? 
        <p className="charWarning"><span className="charWarningText">Please enter at least 2 characters for your username</span> 🙃 </p>
        : null }

      </>
    );
  }
}

export default NameInput;
