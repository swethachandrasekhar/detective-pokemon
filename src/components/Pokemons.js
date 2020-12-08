import React, { Component } from 'react';
import axios from "axios";

class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
      displayPokemonList: [],
    //   successPokemonType: this.props.successPokemonType,
    };
  }

  componentDidMount() {
      console.log(this.props.successPokemonType);

   this.getPokemons(this.props.successPokemonType);
    // console.log(newPokemonArray);
    
  }

  getPokemons = async (successPokemonType) => {
    //Make an API call to get a list of Pokemons for Successful Pokemon Type
    //Store the top result in the displayPokemons List
    let newPokemonArray = [];
    console.log(`test`);
    let successfulPokemon = await this.getPokemonsAPICall(successPokemonType);
    //Push the success pokemon object along with a success flag
    let pokemObject =
      successfulPokemon.data.pokemon[this.getRandomIndex(10)].pokemon;
    pokemObject.match = "success";
    newPokemonArray.push(pokemObject);
    console.log(newPokemonArray);
    //Make an API call to get 4 random pokemon of different types
    let unsuccessfulPokemonPromises = [];
    for (let i = 0; i < 4; i++) {
      unsuccessfulPokemonPromises[i] = await this.getPokemonsAPICall(
        this.getRandomIndex(100)
      );
    }

    //Parse this promise array to create a list of unsuccessful pokemons
    const unsuccessfulArray = this.parseUnsuccessfulPokemonPromises(
      unsuccessfulPokemonPromises
    );

    //Push the unsuccessful pokemons into the pokemons array
    newPokemonArray.push(...unsuccessfulArray);
    // newPokemonArray = Object.values(newPokemonArray)  
    console.log(newPokemonArray);      
    // Set the display list with the pokemon array
    this.setState({
      displayPokemonList: newPokemonArray,
    });
    // return newPokemonArray
  };


  getPokemonsAPICall = (PokemonType) => {
    return axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/3`,
      dataResponse: "json",
    });
  };

  
  
  getRandomIndex = (limit) => {
    //   get an index between 0 to 9

    const index = Math.floor(Math.random() * limit);
    return index;
  };

  
  parseUnsuccessfulPokemonPromises = (PokemonPromises) => {
    console.log(PokemonPromises);
    let unSuccessfulPokemonArray = [];
    for (let i = 0; i < PokemonPromises.length; i++) {
      let pokemObject =
        PokemonPromises[i].data.pokemon[this.getRandomIndex(100)].pokemon;
      pokemObject.match = "fail";
      console.log(pokemObject);
      unSuccessfulPokemonArray.push(pokemObject);
    }
    return unSuccessfulPokemonArray;
  };

  render() {
    return(

        
            this.state.displayPokemonList
            ? 
            this.state.displayPokemonList.map((pokemon) => {
              return <p>{pokemon.name}</p>;  
            })
            : null
       
    )
  }
}

export default Pokemons;