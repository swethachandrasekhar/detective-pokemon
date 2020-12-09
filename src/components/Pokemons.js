import React, { Component } from 'react';
import axios from "axios";

class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
      displayPokemonList: [],
      pokemonList: [],
      successPokemonArray: [],
      unSuccessPokemonArray: []
      // successPokemonType: this.props.successPokemonType,
    };
  }

  componentDidMount() {
    // console.log(this.props.successPokemonType);

    this.getPokemons(this.props.successPokemonType);
    // console.log(newPokemonArray);
  }

  // success pokemon obj in state
  setArrayOfSuccessPokemonObj = (succeesPokemonPromise) => {
    //Push the success pokemon object along with a success flag
    let pokemObject =
      succeesPokemonPromise.data.pokemon[this.getRandomIndex(10)].pokemon;
    pokemObject.match = "success";

    const tempArray = []
    tempArray.push(pokemObject)
    console.log(tempArray);
    this.setState({
      successPokemonArray: tempArray
    })

  }

  setArrayOfWrongPokemonObj = async () => {
    // WRONG ANSWERS API CALL =======================
    //Make an API call to get random pokemon of different types
    let unsuccessfulPokemonPromises = [];
    for (let i = 0; i < 10; i++) {
      unsuccessfulPokemonPromises[i] = await this.getPokemonsAPICall(this.getRandomIndex(17));
    }

    //Parse this promise array to create a list of unsuccessful pokemons
    const unsuccessfulArray = this.parseUnsuccessfulPokemonPromises(
      unsuccessfulPokemonPromises
    );
    console.log(unsuccessfulArray)

    return unsuccessfulArray;
  }

  getPokemons = async (successPokemonType) => {

    // RIGHT ANSWERS API CALL =======================
    //Make an API call to get a list of Pokemons for Successful Pokemon Type
    //Store the top result in the displayPokemons List
    let newPokemonArray = [];
    console.log(`test`);
    let successfulPokemon = await this.getPokemonsAPICall(successPokemonType);

    // set success pokemon object in state
    this.setArrayOfSuccessPokemonObj(successfulPokemon);

    const unsuccessfulArray = await this.setArrayOfWrongPokemonObj();

    console.log(unsuccessfulArray)

    this.getFinalPokemonDisplayList(unsuccessfulArray)


    // console.log('returnArray',returnArray)
    // this.setState({
    //   displayPokemonList: returnArray
    // })
    // return newPokemonArray
  };


  getFinalPokemonDisplayList = async (pokemonArray) => {
    console.log(pokemonArray);
    let requestPokemonArray = [];
    let allPokeProperties = [];
    for (let i = 0; i < pokemonArray.length; i++) {
      requestPokemonArray.push(axios.get(pokemonArray[i].url))
    }

    
   const resultPokemonObject =  await Promise.all([...requestPokemonArray]);
   console.log(resultPokemonObject)

            resultPokemonObject.forEach((pokemonObj, index) => {
              let onePokeProperties = {};
              const pokeImage =
                pokemonObj[`data`][`sprites`][`other`][`official-artwork`][
                  `front_default`
                ];

              if (pokeImage !== null) {
                console.log(pokeImage);
                // const abilities = Object.values(
                //   pokemonObj[`data`][`abilities`]
                // );
                const abilities = pokemonObj[`data`][`abilities`];
                console.log(abilities)
                let abilityArray = [];
                abilities.forEach((ability) => {
                  abilityArray.push(ability.ability.name);
                });
                console.log(abilityArray);
                const pokeName = pokemonObj[`data`][`name`];
                let match = "";
                index === 0 ? (match = "correct") : (match = "wrong");
                onePokeProperties = {
                  name: pokeName,
                  abilities: abilityArray,
                  id: pokemonObj[`data`][`id`],
                  match: match,
                  image: pokeImage,
                };
                allPokeProperties.push(onePokeProperties);
              }
            });

          this .setState({
              displayPokemonList: allPokeProperties

          })
         
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

    const index = Math.floor(Math.random() * limit) ;
    return index === 0 ? index + 1 : index;
  };

  parseUnsuccessfulPokemonPromises = (PokemonPromises) => {
    // console.log(PokemonPromises);
    let unSuccessfulPokemonArray = [];
    for (let i = 0; i < PokemonPromises.length; i++) {
      console.log(PokemonPromises[i])
      let pokemObject =
        PokemonPromises[i].data
        .pokemon[
          this.getRandomIndex(PokemonPromises[i].data.pokemon.length)
        ].pokemon;
      // console.log(pokemObject);
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
            <img src={pokemon.image} alt="" />
          </>
        )
      })
      : null;
  }
}

export default Pokemons;