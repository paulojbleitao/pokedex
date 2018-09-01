import React from 'react';
import axios from 'axios';

const EvolutionCell = ({ pokemon }: any) => (
    <div className="col">
        <img src={pokemon.sprites.front_default} width="48px" alt="" />
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

    static getDerivedStateFromProps() {
        return { chain: [] };
    }

    componentDidUpdate() {
        const { chain } = this.state;
        if (chain.length === 0) {
            this.updateEvolutionChain();
        }
    }

    async getEvolutionChain() {
        const { pokemon } = this.props;
        const species = await axios.get(pokemon.species.url);
        const evolution = await axios.get(species.data.evolution_chain.url);
        const chain = this.createEvolutionChain(evolution.data.chain, []);
        const pokemons = await Promise.all(chain);
        return pokemons.map(p => p.data);
    }

    updateEvolutionChain() {
        this.getEvolutionChain()
            .then((pokemons) => {
                console.log(pokemons);
                this.setState({ chain: pokemons });
            });
    }

    /* eslint-disable no-param-reassign */
    createEvolutionChain(pokemon, chain) {
        if (pokemon) {
            const species = pokemon.species.name;
            chain.push(axios
                .get(`https://pokeapi.co/api/v2/pokemon/${species}/`));
            pokemon.evolves_to.forEach((p) => {
                chain = this.createEvolutionChain(p, chain);
            });
        }
        return chain;
    }
    /* eslint-enable no-param-reassign */

    render() {
        const { chain } = this.state;
        const evolution = chain.map(pokemon => (
            <EvolutionCell pokemon={pokemon} />));
        return <div className="row no-gutters">{evolution}</div>;
    }
}

export default EvolutionChain;
