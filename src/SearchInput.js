import Autosuggest from 'react-autosuggest';
import React from 'react';
import pokemonNames from './util/pokemonNames';

const renderInputComponent = (inputProps) => (
    <div className="form-group">
        <div className="input-group mb-3">
            <input {...inputProps} />
            <div className="input-group-append button-container">
                <button className="btn btn-danger" type="submit">Search!</button>
            </div>
        </div>
    </div>
);

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
  
function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
        return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return pokemonNames.names.filter(name => regex.test(name)).slice(0, 5);
}
  
function getSuggestionValue(suggestion) {
    return suggestion;
}
  
function renderSuggestion(suggestion) {
    return (
        <span>{suggestion}</span>
    );
}

class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: '', suggestions: [] };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSearch(this.state.value);
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
    };
  
    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Pokemon name',
            value,
            onChange: this.onChange,
            className: 'form-control'
        };

        return (
            <form onSubmit={this.handleSubmit}>
                        <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            renderInputComponent={renderInputComponent}
                        />
            </form>
        );
    }
}

export default SearchInput;
