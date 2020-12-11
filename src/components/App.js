import { Component } from 'react';
import '../App.scss';

import Header from './Header/Header.js';
import Home from './Home.js';
import Footer from './Footer.js';


class App extends Component {
  constructor(){
    super();
    this.state ={
      user: '',
      isNameSubmit: false,
      quizzed: ''
    }
  }

 grabUsername = (name, isSubmit) => {
    this.setState({
      user: name,
      isNameSubmit: isSubmit
    })
 }

 isQuizzed = (quizzed) => {
   this.setState({
     quizzed: quizzed
   })
 }

 reset = () => {
   this.setState({
      isNameSubmit: false,
      user: ''
   })
 }


  render() {
    return (
      <>
        <div className="content">
          <div className="wrapper">
            <h1>Detective Pokémon</h1>
          </div>
          {
            !this.state.isNameSubmit 
            ? <Header 
                getUser={this.grabUsername} 
                username={this.state.user}
              />
            : null
          }
          
            <div className="wrapper greeting">
              {
              this.state.user.length >= 2 && this.state.quizzed === ''
                ? <>
                    <p>Thank you{" "} <span> {this.state.user} </span> for joining this fight with us!</p>
                    <p>Please pick a city and the category of crime that you will help to solve.</p>
                  </>
                : null
              }
            </div>
          

          {
            this.state.user.length >= 2
              ? <Home
                userName={this.state.user}
                isQuizzed={this.isQuizzed} 
                reset={this.reset}
                />
              : null
          }

        </div>
        
        <Footer />
      </>
    );
  }
}

export default App;