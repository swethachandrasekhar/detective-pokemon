import { Component } from 'react';
import '../App.scss';

import Header from './Header/Header.js';
import Home from './Home.js';
import Footer from './Footer.js';
import Ball from './Ball.js';

class App extends Component {
  constructor(){
    super();
    this.state ={
      user: ''
    }
  }

 grabUsername = (name) => {
    this.setState({
      user: name
    })
 }

  render() {
    return (
      <>
        <Ball />
        <Header getUser={this.grabUsername} username={this.state.user}/>

        {
          this.state.user.length >= 2
            ? <Home />
            : null
        }
        
        <Footer />
      </>
    );
  }
}

export default App;