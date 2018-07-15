import React from 'react';
import axios from 'axios';

const EvolutionCell = ({ pokemon }) => (
    <div className="col">
        <img src={pokemon.sprites.front_default} width="48px" alt=""/>
    </div>
);

class EvolutionChain extends React.Component {
    constructor(props) {
        super(props);

        this.state = { chain: [] };
    }

    componentDidMount() {
        this.updateEvolutionChain();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { chain: [] };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.chain.length === 0 ) {
            this.updateEvolutionChain();
        }
    }
    
    updateEvolutionChain() {
        this.getEvolutionChain()
            .then((pokemons) => {
                console.log(pokemons);
                this.setState({ chain: pokemons });
            });
    }

    async getEvolutionChain () {
        const species = await axios.get(this.props.pokemon.species.url);
        const evolution = await axios.get(species.data.evolution_chain.url);
        const pokemons = await this.createEvolutionChain(evolution.data);
        return pokemons;
    };
    
    async createEvolutionChain (evolution) {
        let promises = [];
        let currentCell = evolution.chain;
    
        while (currentCell) {
            let nextPokemon = currentCell.evolves_to[0];
            promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${currentCell.species.name}/`));
            currentCell = nextPokemon;
        }
    
        let pokemons = await Promise.all(promises);
        return pokemons.map((pokemon) => pokemon.data);
    };

    render() {
        const evolution = this.state.chain.map((pokemon, index) => <EvolutionCell key={index} pokemon={pokemon} />);
        return <div className="row no-gutters">{evolution}</div>;
    }
};

export default EvolutionChain;
