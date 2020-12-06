import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Component } from 'react';
import './App.css';

import Home from './components/Home.js';
import Footer from './components/Footer.js';

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Route path="/" component={Home} />
        <Footer />
      </Router>
    );
  }
}

export default App;