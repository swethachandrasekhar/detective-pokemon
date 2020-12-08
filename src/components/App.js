import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Component } from 'react';
import '../App.css';

import Header from './Header/Header.js';
import Home from './Home.js';
import Footer from './Footer.js';

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <>
          <Home />
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;