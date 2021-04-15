import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {term: ""};
    }
    render() { // every class component requires a render method
        return (
            <div className="search-bar">
            <input 
                value = {this.state.term}
                onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar; // any file which imports this file imports SearchBar component