import { Component } from 'react';
import NameInput from './NameInput.js';
// import icon from '../pokemon-icon-2.png'

class Header extends Component{
    constructor() {
        super();
        this.state = {
            nameToDisplay: ''
        }
    }
    
    getUsername = (name) => {
        this.setState({
            nameToDisplay: name
        })
    }

    render() {

        return (
            <>
                <header>
                    <div className="wrapper">
                        <h1>Detective Pokémon</h1>

                        <div className="introText">
                            <p>It is dark times out there. In this new world, Pokémon come to rescue and support the UK law enforcement.</p> 
                            <p>Pick a Pokemon that is best suited to help you solve a crime. Each pokemon has different abilities that can help them solve different categories of crime.</p>
                        </div>

                        <NameInput userInput={this.getUsername}/>

                        {
                            this.state.nameToDisplay.trim().length >= 2 
                                ? <p>Thank you <span>{this.state.nameToDisplay} for joining this fight with us!</span></p>
                                : null
                        }
                        
                    </div>
                </header>
            </>
        )
    }
}

export default Header;