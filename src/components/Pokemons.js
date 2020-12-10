import React, { Component } from "react";
import axios from "axios";
import { cityCoordinates } from "../dataStructures.js";
import Ball from './Ball.js'

class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
      displayPokemonList: [],
      pokemonList: [],
      successPokemonArray: [],
      unSuccessPokemonArray: [],
      cityName: "city",
    };
  }

  componentDidMount() {
    //Make a function call to get a list of 5 pokemons
    this.getPokemons(this.props.successPokemonType);
  }

  getPokemons = async (successPokemonType) => {
    // RIGHT ANSWERS API CALL
    //Make an API call to get a list of Pokemons for Successful Pokemon Type
    //Store the top result in the displayPokemons List

    let successfulPokemon = await this.getPokemonsAPICall(successPokemonType);

    const successfulArray = await this.setArrayOfSuccessPokemonObj(
      successfulPokemon
    );
    const finalSuccessArray = await this.getFinalPokemonDisplayList(
      successfulArray,
      "correct"
    );
    const unsuccessfulArray = await this.setArrayOfWrongPokemonObj();

    const finalUnsuccessfulArray = await this.getFinalPokemonDisplayList(
      unsuccessfulArray,
      "wrong"
    );

    //Get the selected City
    this.translateCoordsToCityName();

    // Combine the correct and wrong pokemons to get a final display list
    this.combineArrays(finalSuccessArray, finalUnsuccessfulArray);
  };

  //Function to store 10 success pokemons from the Promise Object
  setArrayOfSuccessPokemonObj = async (succeesPokemonPromise) => {
    let successArray = [];
    for (let i = 0; i < 10; i++) {
      let pokemObject = await succeesPokemonPromise.data.pokemon[
        this.getRandomIndex(20)
      ].pokemon;
      successArray.push(pokemObject);
    }

    return successArray;
  };

  //Function to store 10 wrong pokemons from the Promise Object
  setArrayOfWrongPokemonObj = async () => {
    // WRONG ANSWERS API CALL
    //Make an API call to get random pokemon of different types
    let unsuccessfulPokemonPromises = [];
    for (let i = 0; i < 10; i++) {
      unsuccessfulPokemonPromises[i] = await this.getPokemonsAPICall(
        this.getRandomIndex(17)
      );
    }
    //Parse this promise array to create a list of unsuccessful pokemons
    const unsuccessfulArray = this.parseUnsuccessfulPokemonPromises(
      unsuccessfulPokemonPromises
    );

    return unsuccessfulArray;
  };

  //Function to make an API to get the pokemon types
  getPokemonsAPICall = (PokemonType) => {
    return axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${PokemonType}`,
      dataResponse: "json",
    });
  };

  //Function to get the selected city
  translateCoordsToCityName = () => {
    for (const element of cityCoordinates) {
      if (element.poly.toString() === this.props.location.toString()) {
        this.setState({
          cityName: element.name,
        });
      }
    }
  };

  //Function to combine the correct and wrong pokemons to get a final display list
  combineArrays = (successArray, unsuccessArray) => {
    let finalArray = [];

    finalArray.push(successArray[0]);
    for (let i = 0; i < 4; i++) {
      finalArray.push(unsuccessArray[i]);
    }

    this.shuffle(finalArray);
    console.log(finalArray);
    this.setState({
      displayPokemonList: finalArray,
    });
  };


  // Fisher-Yates to shuffle the final array everytime before displaying
  shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  
  
  //Function to make an API call to each pokemon endpoint to get the pokemon details(like abilities, image, name etc)
  getFinalPokemonDisplayList = async (pokemonArray, flag) => {

    let requestPokemonArray = [];
    let allPokeProperties = [];
    //Create an array of axios calls
    for (let i = 0; i < pokemonArray.length; i++) {
      requestPokemonArray.push(axios.get(pokemonArray[i].url));
    }

    //promise.all to get all the pokemon properties
    const resultPokemonObject = await Promise.all([...requestPokemonArray]);

    resultPokemonObject.forEach((pokemonObj) => {

      let onePokeProperties = {};
       //Pokemon image 
      const pokeImage =
        pokemonObj[`data`][`sprites`][`other`][`official-artwork`][
          `front_default`
        ];

      if (pokeImage !== null) {

        const abilities = pokemonObj[`data`][`abilities`];

        let abilityArray = [];
        //Pokemon abilites
        abilities.forEach((ability) => {
          abilityArray.push(ability.ability.name);
        });

        //Pokemon Name
        const pokeName = pokemonObj[`data`][`name`];

        //Create an object with all the pokemon properties
        onePokeProperties = {
          name: pokeName,
          abilities: abilityArray,
          id: pokemonObj[`data`][`id`],
          match: flag,
          image: pokeImage,
        };
        // Push the objects in to an array  
        allPokeProperties.push(onePokeProperties);
      }
    });
    return allPokeProperties;
  };


  //Function that returns a random index
  getRandomIndex = (limit) => {

    const index = Math.floor(Math.random() * limit);
    // If the returned index is 0 make it 1
    return index === 0 ? index + 1 : index;
  };

  //Function to parse a list of wrong pokemon promises
  parseUnsuccessfulPokemonPromises = (PokemonPromises) => {
    let unSuccessfulPokemonArray = [];
    for (let i = 0; i < PokemonPromises.length; i++) {
      let pokemObject =
        PokemonPromises[i].data.pokemon[
          this.getRandomIndex(PokemonPromises[i].data.pokemon.length)
        ].pokemon;

      pokemObject.match = "fail";

      unSuccessfulPokemonArray.push(pokemObject);
    }

    return unSuccessfulPokemonArray;
  };

  //Function to handle the user's pokemon selection
  handlePokemonSelect = (selectedPokemonObject) => {
    console.log(selectedPokemonObject);
    if (selectedPokemonObject.match === "correct") {
      this.props.handleGameFlag(true);
    } else if (selectedPokemonObject.match === "wrong") {
      this.props.handleGameFlag(false);
    }
    
  };

  render() {
    return (
      <div>
        {
         
        this.state.displayPokemonList.length !== 0 ? (
          <>
            <div className="quizMessage">
              <p>
                {" "}
                You are in{" "}
                <span className="chosenCity">{this.state.cityName}</span>,
                trying to solve a{" "}
                <span className="chosenCrime">{this.props.crime}</span> type of
                crime.
              </p>
            </div>

            <div className="chooseYourFighter">
              <p>Choose a Pokemon to help you solve the case:</p>
            </div>

            <div className="options">
              {/* DISPLAY LIST OF POKEMON OPTIONS */}
              {this.state.displayPokemonList
                ? this.state.displayPokemonList.map((pokemon, pokemonIndex) => {
                    return (
                      <article
                        className="pokeDisplay" 
                        key={`${pokemonIndex}${pokemon.name}`}
                        onClick={() => {
                          this.handlePokemonSelect(pokemon);
                        }}
                      >
                        <p>{pokemon.name}</p>

                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          key={pokemon.name}
                        />

                        <ul>
                          {pokemon.abilities.map((ability, index) => {
                            return (
                              <li key={`${ability}${index}`}>
                                <span className="ability">{ability}</span>
                                &nbsp;
                              </li>
                            );
                          })}
                        </ul>
                      </article>
                    );
                  })
                : null}
            </div>
          </>
        ) : 
        // <Ball displayClass='insidePokemon' />
        <Ball />
          
        }
      </div>
    );
        
   }
}

export default Pokemons;
