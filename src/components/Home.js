import React, { Component } from "react";
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
      chosenPokeName: "",
      chosenPokeImageUrl: "",
    };
  }

  componentDidMount() {
    // store each properties in an array
    const crimeArray = Object.keys(crimeCategories);
    
    this.setState({
      crimeCategories: crimeArray,
    });
  }

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
  handleGameFlag = (flagValue, chosenPokeName, chosenPokeImageUrl) => {
    console.log(chosenPokeImageUrl);
    this.setState({
      gameFlag: flagValue,
      chosenPokeName: chosenPokeName,
      chosenPokeImageUrl: chosenPokeImageUrl
    }, () => {
      window.scrollTo({
        top: this.resultsSection.current.offsetTop
      });
      console.log(this.state.chosenPokeImageUrl);
    }
    
    );
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <main>
        <div className="wrapper">
        <form name="dropdownForm">
          {/* if selected location not equal to ''
              then show CrimeCategories dropdown and submit button */}
          <CrimeLocation getLocation={this.getLocationChange} />
          
          {
            this.state.selectedLocation !== ''
            ? <>
                <CrimeCategories 
                  getCrimeChange={this.handleCrime} 
                  crimeCategoriesArray={this.state.crimeCategories}
                />

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
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />
          ) : null}
        </div>

        {/* Display the results page      */}
          <div ref={this.resultsSection}>
            <Results
              key={this.state.gameFlag}
              isSuccessfulFlag={this.state.gameFlag}
              userName={this.props.userName}
              chosenPokeName={this.state.chosenPokeName}
              chosenPokeImageUrl={this.state.chosenPokeImageUrl}
              selectedCrime={this.state.selectedCrime}
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
