/* @flow */

import React from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import SearchInput from './SearchInput';
import './app.css';

type Props = {};

type State = {
    pokemonData: any,
    failure: boolean,
}

class App extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);

        this.state = {
            pokemonData: null,
            failure: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch: string => void;
    handleSearch(pokemonName : string) {
        const lowerCase = pokemonName.toLowerCase();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCase}/`)
            .then((result) => {
                console.log(result.data);
                this.setState({ pokemonData: result.data, failure: false });
            })
            .catch(() => {
                this.setState({ failure: true });
            });
    }

    render() {
        const { pokemonData, failure } = this.state;
        const pokemon = pokemonData === null
            ? null : <Pokemon data={pokemonData} />;
        const showFailure = failure ? <Failure /> : null;

        return (
            <div className="everything">
                <h1 className="center">Pokedex</h1>
                <h6 className="center">
                    Type in a Pokemon&apos;s name and press search!
                </h6>
                <SearchInput handleSearch={this.handleSearch} />
                {showFailure}
                {pokemon}
            </div>
        );
    }
}

const Failure = () => (
    <div className="alert alert-danger center" role="alert">
        Sorry!
        <br />
        We searched far and wide, but we couldn&apos;t find that Pokemon. :(
    </div>
);

export default App;
