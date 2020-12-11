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
          <h3>Sorry {this.props.userName}, {this.props.chosenPokeName} was the wrong selection</h3>
        </div>
      );
    } else {
      return (
        <div className="resultsSection">
          <h3>Great job {this.props.userName}! {this.props.chosenPokeName} is right for the job</h3>
        </div>
      );
    }
  }
}

export default Results;
