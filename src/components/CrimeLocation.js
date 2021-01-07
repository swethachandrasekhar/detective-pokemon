import { Component } from "react";
import { cityCoordinates } from "../dataStructures.js";

class CrimeLocation extends Component {
  //Function to store user's selected location in the parent component's state
  onLocationChange = (e) => {
    this.props.getLocation(e.target.value);
  };

  //Display the list of locations in the UK(Data retrieved from UK police API)
  render() {
    return (
      <select onChange={this.onLocationChange}>
        <option value="none">Choose location</option>
        {cityCoordinates.map((place) => {
          return (
            <option key={place.poly} value={place.poly}>
              {place.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default CrimeLocation;
