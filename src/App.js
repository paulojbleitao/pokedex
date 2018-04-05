import React from 'react';
import axios from 'axios';

import abilitiesArray from './Ability';
import typesArray from './Type';
import { formatString, abilityOrAbilities } from './util';

import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonName: '',
            pokemonData: null,
            failure: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ ...this.state, pokemonName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName.toLowerCase()}/`)
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
            <Input pokemonName={this.state.pokemonName} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            {failure}
            {pokemon}
        </div>
        )
    }
}

const Input = ({ pokemonName, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                    placeholder="Pokemon name" value={pokemonName}
                    onChange={handleChange}/>
                <div className="input-group-append">
                    <button className="btn btn-danger" type="submit">Search!</button>
                </div>
            </div>
        </div>
    </form>
)

const Failure = ({ failure }) => (
    <div className="alert alert-danger center" role="alert">
        Sorry! <br/>
        We searched far and wide, but we couldn't find that Pokemon. :(
    </div>
)

const Pokemon = ({ data }) => (
    <div className="jumbotron">
        <div className="container">
            <div className="row">
                <div className="col center">
                    <img src={data.sprites.front_default} alt=""/>
                </div>
                <div className="col">
                    <Card category="Name" content={formatString(data.forms[0].name)} />
                </div>
                <div className="col">
                    <Card category={abilityOrAbilities(data.abilities)} content={abilitiesArray(data.abilities)} />
                </div>
            </div>
            <div className="row">
                <div className="col center">
                    {typesArray(data.types)}
                </div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
        </div>
    </div>
)

const Card = ({category, content}) => (
    <div className="card">
        <div className="card-header">
            {category}
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">{content}</li>
        </ul>
    </div>
)

export default App;