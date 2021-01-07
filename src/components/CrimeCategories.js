import { Component } from "react";

class CrimeCategories extends Component {
  //Function to store the user selected Crime category in the parent component's state
  handleCrime = (e) => {
    this.props.getCrimeChange(e.target.value);
  };

  //Renders all the crime categories. These categories where retrieved from UK Police API
  render() {
    return (
      <select onChange={this.handleCrime}>
        <option value="none">Choose crime</option>
        {this.props.crimeCategoriesArray.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    );
  }
}

export default CrimeCategories;
