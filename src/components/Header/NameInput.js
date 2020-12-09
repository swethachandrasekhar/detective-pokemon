import { Component } from 'react';

class NameInput extends Component {
    constructor() {
        super();
        this.state = {
            userName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.userInput(this.state.userName)
    }

    render() {
        return (
            <form name="userName" className="userNameForm">
                <label htmlFor="nameInput">Your name: </label>
                <input onChange={this.handleChange} type="text" name="nameInput" id="nameInput"/>

                <button className="nameButton" onClick={this.handleSubmit}> Submit</button>
            </form>
        )
    }
}

export default NameInput;