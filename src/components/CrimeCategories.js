import { Component } from 'react';

class CrimeCategories extends Component {

    handleCrime = (e) => {
        this.props.getCrimeChange(e.target.value);
    };

    render(){
        return(
            <select onChange={this.handleCrime}>
                {this.props.crimeCategoriesArray.map((category, index) => {
                    return (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    );
                })}
            </select>
        )
    }
}

export default CrimeCategories;