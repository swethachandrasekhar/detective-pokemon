import { Component } from 'react';
import '../App.css';

import Home from './Home.js';
import Footer from './Footer.js';

class App extends Component {
  render() {
    return (
      <>
        <Home />
        <Footer />
      </>
    );
  }
}

export default App;