import React from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonData: null,
            failure: false
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(pokemonName) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`)
            .then((result) => {
                console.log(result.data);
                this.setState({ ...this.state, pokemonData: result.data, failure: false });
            })
            .catch(() => {
                this.setState({ ...this.state, failure: true});
            });
    }

    render() {
        let pokemon = this.state.pokemonData === null? null : <Pokemon data={this.state.pokemonData}/>;
        let failure = this.state.failure? <Failure /> : null;

        return (
        <div className="everything">
            <h1 className="center">Pokedex</h1>
            <h6 className="center">Type in a Pokemon's name and press search!</h6>
            <SearchInput handleSearch={this.handleSearch}/>
            {failure}
            {pokemon}
        </div>
        )
    }
}


class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { pokemonName: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ pokemonName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSearch(this.state.pokemonName);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control"
                            placeholder="Pokemon name" value={this.state.pokemonName}
                            onChange={this.handleChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-danger" type="submit">Search!</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const Failure = ({ failure }) => (
    <div className="alert alert-danger center" role="alert">
        Sorry! <br/>
        We searched far and wide, but we couldn't find that Pokemon. :(
    </div>
)

export default App;
