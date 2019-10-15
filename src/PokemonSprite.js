/* @flow */

import React from 'react';

type Props = {
    sprites: any
}

type State = {
    shiny: boolean
}

class PokemonSprite extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { shiny: false };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { shiny } = this.state;
        this.setState({ shiny: !shiny });
    }

    render() {
        const { sprites } = this.props;
        const { shiny } = this.state;
        const sprite = shiny ? sprites.front_shiny : sprites.front_default;

        return (
            <img
              className="main clickable"
              src={sprite}
              alt=""
              onClick={this.handleClick}
            />
        );
    }
}

export default PokemonSprite;
