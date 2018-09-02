/* @flow */

import React from 'react';
import axios from 'axios';
import BASE_URL from './util/baseUrl';

/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */

type CellProps = {
    pokemon: any,
    handleSearch: string => void,
}

const EvolutionCell = ({ pokemon, handleSearch }: CellProps) => (
    <div className="col">
        <img
          className="evolution-cell"
          src={pokemon.sprites.front_default}
          alt=""
          onClick={() => handleSearch(pokemon.name)}
        />
    </div>
);

type ChainProps = {
    pokemon: any,
    handleSearch: string => void,
}

type ChainState = {
    chain: Array<EvolutionCell>,
}

class EvolutionChain extends React.Component<ChainProps, ChainState> {
    constructor(props : ChainProps) {
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

    async getEvolutionChain() : Promise<any> {
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
                this.setState({ chain: pokemons });
            });
    }

    /* eslint-disable no-param-reassign */
    createEvolutionChain(pokemon: any, chain: Array<any>) {
        if (pokemon) {
            const species = pokemon.species.name;
            chain.push(axios
                .get(`${BASE_URL}/pokemon/${species}/`));
            pokemon.evolves_to.forEach((p) => {
                chain = this.createEvolutionChain(p, chain);
            });
        }
        return chain;
    }
    /* eslint-enable no-param-reassign */

    render() {
        const { handleSearch } = this.props;
        const { chain } = this.state;
        const evolution = chain.map(pokemon => (
            <EvolutionCell pokemon={pokemon} handleSearch={handleSearch} />));
        return <div className="row no-gutters">{evolution}</div>;
    }
}

export default EvolutionChain;
