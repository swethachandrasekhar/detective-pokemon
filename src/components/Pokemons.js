import React, { Component } from 'react';
import axios from "axios";

class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
      displayPokemonList: [],
      pokemonList: [],
      //   successPokemonType: this.props.successPokemonType,
    };
  }

  componentDidMount() {
    console.log(this.props.successPokemonType);

    this.getPokemons(this.props.successPokemonType);
    // console.log(newPokemonArray);
  }

  getPokemons = async (successPokemonType) => {

    // RIGHT ANSWERS API CALL =======================
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

    // WRONG ANSWERS API CALL =======================
    //Make an API call to get 4 random pokemon of different types
    let unsuccessfulPokemonPromises = [];
    for (let i = 0; i < 4; i++) {
      unsuccessfulPokemonPromises[i] = await this.getPokemonsAPICall(18);

        // this.getRandomIndex(18)
    //   );
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
    // this.setState({
    //   pokemonList: newPokemonArray,
    // });

    this.getFinalPokemonDisplayList(newPokemonArray);
    // return newPokemonArray
  };


  getFinalPokemonDisplayList = (pokemonArray) => {
    console.log(pokemonArray);
    let requestPokemonArray = []    
    for (let i =0; i < pokemonArray.length; i++){
        requestPokemonArray.push(axios.get(pokemonArray[i].url))
    }

        Promise.all([...requestPokemonArray])
          .then(([...res]) => {
            let allPokeProperties = [];
            res.forEach((pokemonObj, index) => {
                console.log(pokemonObj);
                // const pokeImage = pokemonObj[`data`][`sprites`][`other`][`official-artwork`][`front_default`];
                // console.log(pokeImage);
                // // const { front_default } = pokemonObj[`data`][`sprites`][`other`][`official-artwork`];
                // // console.log(front_default);
                const abilities = (Object.values(pokemonObj[`data`][`abilities`]))
                let abilityArray = [];
                abilities.forEach(ability => {
                  abilityArray.push(ability.ability.name)
                })
                console.log(abilityArray);
                const pokeName = (pokemonObj[`data`][`name`]);
                let match = '';
                index === 0 ? match = "correct" : match = "wrong";
                const onePokeProperties = {
                  "name": pokeName,
                  "abilities": abilityArray,
                  "id": (pokemonObj[`data`][`id`]),
                  "match": match
                }
                console.log(onePokeProperties);
                allPokeProperties.push(onePokeProperties);
            });
            console.log(allPokeProperties);
            this.setState({
              displayPokemonList: allPokeProperties
            })
        
          })
          .catch((errors) => {
            // react on errors.
          });
  }
  getPokemonsAPICall = (PokemonType) => {
    return axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${PokemonType}`,
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
        PokemonPromises[i].data.pokemon[this.getRandomIndex(PokemonPromises[i].data.pokemon.length)].pokemon;
      console.log(pokemObject);
        pokemObject.match = "fail";
      
      unSuccessfulPokemonArray.push(pokemObject);
    }
    return unSuccessfulPokemonArray;
  };

  render() {
    return this.state.displayPokemonList
      ? this.state.displayPokemonList.map((pokemon) => {
          return (
            <>
              <p>{pokemon.name}</p>
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt=""/>
            </>
          )
        })
      : null;
  }
}

export default Pokemons;