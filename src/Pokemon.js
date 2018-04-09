import React from 'react';
import axios from 'axios';

import abilitiesArray from './Ability';
import typesArray from './Type';
import { formatString, abilityOrAbilities } from './util';

class Pokemon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            evolutionChain: []
        };
    }
    
    componentDidMount() {
        this.updateEvolutionChain();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { evolutionChain: [] };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.evolutionChain.length === 0 ) {
            this.updateEvolutionChain();
        }
    }

    updateEvolutionChain() {
        this.getEvolutionChain()
            .then((pokemons) => {
                console.log(pokemons);
                this.setState({ evolutionChain: pokemons });
            });
    }

    async getEvolutionChain() {
        const species = await axios.get(this.props.data.species.url);
        const evolution = await axios.get(species.data.evolution_chain.url);
        const pokemons = await this.createEvolutionChain(evolution.data);
        return pokemons;
    }

    async createEvolutionChain(evolution) {
        let promises = [];
        let currentCell = evolution.chain;

        while (currentCell) {
            let nextPokemon = currentCell.evolves_to[0];
            promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${currentCell.species.name}/`));
            currentCell = nextPokemon;
        }

        let pokemons = await Promise.all(promises);
        return pokemons.map((pokemon) => pokemon.data);
    }

    render() {
        let evolution = this.state.evolutionChain.map((pokemon, index) => <EvolutionCell key={index} pokemon={pokemon} />);
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col center">
                            <img className="main" src={this.props.data.sprites.front_default} alt=""/>
                        </div>
                        <div className="col">
                            <Card category="Name" content={formatString(this.props.data.forms[0].name)} />
                        </div>
                        <div className="col">
                            <Card category={abilityOrAbilities(this.props.data.abilities)} content={abilitiesArray(this.props.data.abilities)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col center">
                            <div className="row no-gutters">
                                {evolution}
                            </div>
                            {typesArray(this.props.data.types)}
                        </div>
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>
                </div>
           </div>
        );
    }
}

const EvolutionCell = ({ pokemon }) => (
    <div className="col">
        <img src={pokemon.sprites.front_default} width="48px" alt=""/>
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

export default Pokemon;