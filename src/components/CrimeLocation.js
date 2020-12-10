import { Component } from 'react';
import { cityCoordinates } from '../dataStructures.js'

class CrimeLocation extends Component {

    onLocationChange = (e) => {
        this.props.getLocation(e.target.value)
    };

    render() {
        return (
            <select onChange={this.onLocationChange}>
                {cityCoordinates.map((place) => {
                    return (
                        <option key={place.poly} value={place.poly}>
                            {place.name}
                        </option>
                    );
                })}
            </select>
        )
    }
}

export default CrimeLocation;