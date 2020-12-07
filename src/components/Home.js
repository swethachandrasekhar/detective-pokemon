import { Component } from 'react';
import axios from 'axios'

class Home extends Component {
    constructor(){
        super();
        this.state = {
            neighbourhoods: [],
            selectedNeighbourhood: '',
            coordinates: {
                lat: '',
                lon: ''
            }
        }
    }

    componentDidMount(){
        // First API call to get all the neigbourhoods to populate the dropdown list
        const neighbourhoodsApiCall = axios({
            url: `https://data.police.uk/api/leicestershire/neighbourhoods`,
            responseType: 'json',
            method: 'GET'
    })
    .then((res) => {
        const results = res.data.map((location) => {
            return location;
        })
            this.setState({
                neighbourhoods: results
            })
        })
    }

    getLatitudeAndLongitude = (id) => {
        return axios({
            url: `https://data.police.uk/api/leicestershire/${id}`,
            responseType: 'json',
            method: 'GET'
        })
    } 

    getCrime = () => {
        return axios({
            url: `https://data.police.uk/api/crimes-at-location?date=2020-06`,
            responseType: 'json',
            method: 'GET',
            params: {
                lat: 52.6381,
                lng: -1.06538
            }
        })
    }

    onLocationChange = (e) => {
        // this.setState({
        //     selectedNeighbourhood: e.target.value
        // })
        const promiseObj = this.getLatitudeAndLongitude(e.target.value)
        promiseObj.then((res) => {

            this.setState({
                coordinates: {
                    lat: res.data.centre.latitude,
                    lon: res.data.centre.longitude
                }
            })
            this.getCrime().then((res) => {
                console.log(res )
            })
            
        })
    }



    render() {
        return (
            <>
                <h1>Detective Pokémon</h1>

                <form>
                    <select onChange={this.onLocationChange} name="" id="">
                        {this.state.neighbourhoods.map((place ) => {
                            return(
                                <option key={place.id} value={place.id}>
                                    {place.name}
                                </option>
                            )
                        })}
                    </select>
                </form>
            </>
        );
    }
}

export default Home;