import React, { Component } from "react";
import axios from "axios";
import { crimeCategories } from "../dataStructures.js";
import Pokemons from "./Pokemons.js";
import Results from "./Results.js";
import CrimeLocation from "./CrimeLocation.js";
import CrimeCategories from "./CrimeCategories.js";

class Home extends Component {
  constructor() {
    super();
    this.scrollToDiv = React.createRef();
    this.resultsSection = React.createRef();
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
    console.log(this.scrollToDiv);
    //Get the success Pokemon Type and set it in State
    const pokemonType = this.getPokemonType(this.state.selectedCrime);
    this.setState({
      successPokemonType: pokemonType,
    }, () => {
      window.scrollTo({
        top: this.scrollToDiv.current.offsetTop
      });
    });
  };

 //Function to store the game(win/lose) flag 
  handleGameFlag = (flagValue) => {
    this.setState({
      gameFlag: flagValue,
    }, () => {
      window.scrollTo({
        top: this.resultsSection.current.offsetTop
      });
    }
    
    );
  };

  render() {
    return (
      <>
        <form>
          {/* if selected location not equal to ''
              then show CrimeCategories dropdown and submit button */}
          <CrimeLocation getLocation={this.getLocationChange} />
          
          {
            this.state.selectedLocation !== ''
            ? <>
                <CrimeCategories getCrimeChange={this.handleCrime} crimeCategoriesArray={this.state.crimeCategories}/>
                <button onClick={this.handleSubmit}>Submit</button> 
              </>
            : null
          }
          
        </form>

        {/* DISPLAY ALL QUIZ STUFF */}
        <div ref={this.scrollToDiv}>
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
        <div ref={this.resultsSection}>
          <Results
            key={this.state.gameFlag}
            isSuccessfulFlag={this.state.gameFlag}
          />
        </div>

      </>
    );
  }
}

export default Home;
