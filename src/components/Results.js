import React, { Component } from "react";

class Results extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    // If the flag is not set, do not display results 
    //Otherwise display appropriate results
    if (this.props.isSuccessfulFlag === "") {
      return null;
    } else if (this.props.isSuccessfulFlag === false) {
      return (
        <div className="resultsSection">
          <h3>Sorry, that was the wrong selection</h3>
        </div>
      );
    } else {
      return (
        <div className="resultsSection">
          <h3>Great job! This guy's good</h3>
        </div>
      );
    }
  }
}

export default Results;
