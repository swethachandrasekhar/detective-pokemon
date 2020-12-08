import { Component } from 'react';
import '../App.css';

import Header from './Header/Header.js';
import Home from './Home.js';
import Footer from './Footer.js';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>

    );
  }
}

export default App;