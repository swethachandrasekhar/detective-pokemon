import { Component } from 'react';
import axios from 'axios';
import { cityCoordinates, crimeCategories} from '../dataStructures.js'
import Pokemons from "./Pokemons.js";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      crimeCategories: [],
      selectedCrime: "",
      selectedLocation: "",
     
      successPokemonType: '',
    };
  }

  componentDidMount() {
    // store each properties in an array
    const crimeArray = Object.keys(crimeCategories);
    this.setState({
      crimeCategories: crimeArray,
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

  onLocationChange = (e) => {
    this.setState({
      selectedLocation: e.target.value,
    });
  };

  handleCrime = (e) => {
    this.setState({
      selectedCrime: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const pokemonType = this.getPokemonType(this.state.selectedCrime);
    this.setState({
        successPokemonType: pokemonType
    })
  };

  render() {
      console.log(this.state.successPokemonType);
    return (
      <>
        
        <form>
          <select onChange={this.onLocationChange}>
            {cityCoordinates.map((place) => {
              return (
                <option key={place.poly} value={place.poly}>
                  {place.name}
                </option>
              );
            })}
          </select>

          <select onChange={this.handleCrime}>
            {this.state.crimeCategories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>

          <button onClick={this.handleSubmit}>Submit</button>
        </form>

        {/* DISPLAY ALL QUIZ STUFF */}
        <div>
          {this.state.successPokemonType ? (
            <Pokemons
              key={this.state.successPokemonType}
              crime={this.state.selectedCrime}
              successPokemonType={this.state.successPokemonType}
            />
          ) : null}
        </div>

         {/* <div className="pokeDisplay">
             <article>
                <img src="" alt=""/>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, ducimus expedita, enim porro, aspiditate ea deserunt facere impedit esse distinctio suscipit, rem sequi ipsa tempora maxime nesciunt. Qui provident cupiditate temporibus.</p>
             </article>
        </div> */}
      </>
    );
  }
}

export default Home;