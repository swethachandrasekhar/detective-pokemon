import { Component } from 'react';
import '../App.scss';

import Header from './Header/Header.js';
import Home from './Home.js';
import Footer from './Footer.js';
import Ball from './Ball.js';

class App extends Component {
  render() {
    return (
      <>
        < Ball />
        <Header />
        <Home />
        <Footer />
      </>
    );
  }
}

export default App;