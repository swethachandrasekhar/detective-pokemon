import React, { Component } from "react";

class Results extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    // If the flag is not set, do not display an results 
    //Otherwise display appropriate results
    if (this.props.isSuccessfulFlag === "") {
      return null;
    } else if (this.props.isSuccessfulFlag === false) {
      return (
        <div>
          <h3>Fail</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Great job</h3>
        </div>
      );
    }
  }
}

export default Results;
