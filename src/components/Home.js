import { Component } from 'react';
import axios from 'axios';
import { cityCoordinates, crimeCategories} from '../dataStructures.js'

class Home extends Component {
    constructor(){
        super();
        this.state = {
            crimeCategories: [],
            selectedCrime: '',
            selectedLocation: ''
        }
    }

    componentDidMount(){
        // store each properties in an array
        const crimeArray = Object.keys(crimeCategories);
        this.setState({
            crimeCategories: crimeArray
        })
    }

    getCrime = (customArea, crimeCategory) => {
        return axios({
            url: `https://data.police.uk/api/crimes-street/${crimeCategory}`,
            responseType: 'json',
            method: 'GET',
            params: {
                poly: customArea
            }
        })
    }

    onLocationChange = (e) => {
        this.setState({
            selectedLocation: e.target.value
        })
    }
    

    handleCrime = (e) => {
        this.setState({
            selectedCrime: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.selectedLocation, this.state.selectedCrime)
        const crime = this.getCrime(this.state.selectedLocation, this.state.selectedCrime);
        crime.then((res) => {
            console.log(res)
        })

    }


    render() {
        return (
            <>
                <h1>Detective Pokémon</h1>

                <form>
                    <select onChange={this.onLocationChange}>
                        {cityCoordinates.map((place ) => {
                            return(
                                <option key={place.poly} value={place.poly}>
                                    {place.name}
                                </option>
                            )
                        })}
                    </select>

                    <select onChange={this.handleCrime}>
                        {
                            this.state.crimeCategories.map((category, index) => {
                                return(
                                    <option key={index} value={category}>{
                                        category
                                    }</option>
                                )
                            })
                        }
                    </select>

                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </>
        );
    }
}

export default Home;