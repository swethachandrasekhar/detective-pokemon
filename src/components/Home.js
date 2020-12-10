import { Component } from 'react';
import axios from 'axios';
import { crimeCategories } from '../dataStructures.js'
import Pokemons from "./Pokemons.js";
import Results from './Results.js'

import CrimeLocation from './CrimeLocation.js';
import CrimeCategories from './CrimeCategories.js';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      crimeCategories: [],
      //   crimeCategories: {}, 1asdf
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
      //   crimeCategories: crimeCategories 3asdf
    });
  }

  getCrime = (customArea, crimeCategory) => {
    return axios({
      url: `https://data.police.uk/api/crimes-street/${crimeCategory}`,
      responseType: "json",
      method: "GET",
      params: {
        poly: customArea,
      },
    });
  };

  getPokemonType = (userSelectedCrime) => {
    let successType;
    for (const key in crimeCategories) {
      if (key === userSelectedCrime) {
        successType = crimeCategories[key].successfulType;
      }
    }
    console.log(successType);
    return successType;
  };

  getLocationChange = (selectedLocation) => {
    this.setState({
      selectedLocation: selectedLocation,
    });
  };

  handleCrime = (selectedCrime) => {
    this.setState({
      selectedCrime: selectedCrime,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const pokemonType = this.getPokemonType(this.state.selectedCrime);
    this.setState({
      successPokemonType: pokemonType,
    });
  };

  handleGameFlag = (flagValue) => {
    console.log(`In here handleGameFlag`)
    this.setState({
      gameFlag: flagValue
    })

  }


  render() {
    console.log(this.state.successPokemonType);
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

        <Results
          key={this.state.gameFlag}
          isSuccessfulFlag={this.state.gameFlag}
        />

        <Results isSuccessfulFlag={false}/>
      </>
    );
  }
}

export default Home;