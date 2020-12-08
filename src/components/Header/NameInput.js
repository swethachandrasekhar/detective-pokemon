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
            <form name="userName">
                <label htmlFor="nameInput">Enter your name: </label>
                <input onChange={this.handleChange} type="text" name="nameInput" id="nameInput"/>

                <button onClick={this.handleSubmit}> Submit name</button>
            </form>
        )
    }
}

export default NameInput;