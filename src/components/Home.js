import { Component } from "react";
import axios from "axios";
import { crimeCategories } from "../dataStructures.js";
import Pokemons from "./Pokemons.js";
import Results from "./Results.js";
import CrimeLocation from "./CrimeLocation.js";
import CrimeCategories from "./CrimeCategories.js";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      crimeCategories: [],
      selectedCrime: "",
      selectedLocation: "",
      successPokemonType: "",
      gameFlag: "",
    };
  }

  componentDidMount() {
    // store each properties in an array
    const crimeArray = Object.keys(crimeCategories);
    
    this.setState({
      crimeCategories: crimeArray,
    });
  }

  //Function to make an API call to get Crime Categories from UK Police API
  // getCrime = (customArea, crimeCategory) => {
  //   return axios({
  //     url: `https://data.police.uk/api/crimes-street/${crimeCategory}`,
  //     responseType: "json",
  //     method: "GET",
  //     params: {
  //       poly: customArea,
  //     },
  //   });
  // };


//Function to get success Pokemon Type based on the selected Crime Category
  getPokemonType = (userSelectedCrime) => {
    let successType;
    for (const key in crimeCategories) {
      if (key === userSelectedCrime) {
        successType = crimeCategories[key].successfulType;
      }
    }

    return successType;
  };

//Function to set the user's selected Location
  getLocationChange = (selectedLocation) => {
    this.setState({
      selectedLocation: selectedLocation,
    });
  };

 //Function to set the user's selected Crime Category 
  handleCrime = (selectedCrime) => {
    this.setState({
      selectedCrime: selectedCrime,
    });
  };


// Function to handle submit once user has selected the location and crime

  handleSubmit = (e) => {
    e.preventDefault();
    //Get the success Pokemon Type and set it in State
    const pokemonType = this.getPokemonType(this.state.selectedCrime);
    this.setState({
      successPokemonType: pokemonType,
    });
  };

 //Function to store the game(win/lose) flag 
  handleGameFlag = (flagValue) => {
    this.setState({
      gameFlag: flagValue,
    });
  };

  render() {
    return (
      <>
        <form>
          {/* Display locations */}
          <CrimeLocation getLocation={this.getLocationChange} />

          {/* Display Crime Categories  */}
          <CrimeCategories
            getCrimeChange={this.handleCrime}
            crimeCategoriesArray={this.state.crimeCategories}
          />

          <button onClick={this.handleSubmit}>Submit</button>
        </form>

        {/* DISPLAY ALL QUIZ STUFF */}
        <div>
          {this.state.successPokemonType ? (
            <Pokemons
              key={this.state.successPokemonType}
              crime={this.state.selectedCrime}
              successPokemonType={this.state.successPokemonType}
              location={this.state.selectedLocation}
              handleGameFlag={this.handleGameFlag}
            />
          ) : null}
        </div>

        {/* Display the results page      */}
        <Results
          key={this.state.gameFlag}
          isSuccessfulFlag={this.state.gameFlag}
        />
      </>
    );
  }
}

export default Home;
