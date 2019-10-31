/* @flow */

import React from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import SearchInput from './SearchInput';
import BASE_URL from './util/baseUrl';
import './app.css';
import Spinner from './Spinner/Spinner';

type Props = {};

type State = {
    pokemonData: any,
    failure: boolean,
    loading: boolean,
}

class App extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);

        this.state = {
            pokemonData: null,
            failure: false,
            loading: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    handleSearch: string => void;
    handleSearch(pokemonName : string) {
        this.setState({ loading: true });
        const lowerCase = pokemonName.toLowerCase();
        axios.get(`${BASE_URL}/pokemon/${lowerCase}/`)
            .then((result) => {
                this.setState({
                    pokemonData: result.data,
                    failure: false,
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({ failure: true, loading: false });
            });
    }

    resetSearch: () => void;
    resetSearch() {
        this.setState({ pokemonData: null });
    }

    render() {
        const { pokemonData, failure, loading } = this.state;
        const pokemon = pokemonData === null
            ? null
            : <Pokemon data={pokemonData} handleSearch={this.handleSearch} />;
        const showFailure = failure ? <Failure /> : null;
        const showLoading = loading ? <Spinner /> : null;

        const headerCss = pokemon === null
            ? 'center'
            : 'center pointer';

        return (
            <div className="everything">
                <h1 className={headerCss} onClick={this.resetSearch}>
                    Pokedex
                </h1>
                <h6 className="center subtitle">
                    Type in a Pokemon&apos;s name and press search!
                </h6>
                <SearchInput handleSearch={this.handleSearch} />
                {showLoading}
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
