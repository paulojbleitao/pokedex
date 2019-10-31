/* @flow */

import React from 'react';
import axios from 'axios';
import { Type } from './Type';
import NoMoves from './NoMoves';
import pokemonMoves from './util/pokemonMoves';
import { formatString } from './util/util';
import BASE_URL from './util/baseUrl';

function firstWord(string : string) {
    const s = string.split('-');
    return s[0];
}

function getMoves(pokemon : string) {
    let moves = pokemonMoves[pokemon];
    if (moves === undefined) {
        moves = pokemonMoves[firstWord(pokemon)];
    }
    return moves;
}

function formatMoveName(move : string) {
    if (move.startsWith('Hidden Power')) return 'hidden-power';
    const lowerCase = move.toLowerCase();
    const m = lowerCase.replace(/ /g, '-');
    return m;
}

async function getMoveData(move : string) {
    const name = formatMoveName(move);
    const data = await axios.get(`${BASE_URL}/move/${name}`);
    return data;
}

async function getAllMovesData(pokemon : string) {
    let moves = getMoves(pokemon);
    moves = moves.map(m => getMoveData(m).then(r => r));
    moves = await Promise.all(moves);
    return moves.map(m => m.data);
}

function filterDescription(move : Object) {
    const english = move.effect_entries.filter(e => e.language.name === 'en');
    let description = english[0].short_effect;
    const effectIndex = description.search('effect_chance');
    if (effectIndex !== -1) {
        description = description.replace('$', '');
        description = description.replace('effect_chance', move.effect_chance);
    }
    return description;
}

type CategoryProps = {
    category: string,
}

const Category = ({ category }: CategoryProps) => (
    <span className={`badge badge-primary ${category}`}>
        {formatString(category)}
    </span>
);

type MoveProps = {
    name: string,
    type: string,
    category: string,
    basePower: number,
    accuracy: number,
    pp: number,
    description: string,
}

const Move = ({
    name, type, category, basePower, accuracy, pp, description,
} : MoveProps) => {
    const bp = !basePower ? '--' : basePower;
    const acc = !accuracy ? '--' : accuracy;
    return (
        <div>
            <div className="row">
                <div className="col center"><b>{name}</b></div>
                <div className="col center"><Type type={type} /></div>
                <div className="col center">
                    <Category category={category} />
                </div>
                <div className="col center">{bp}</div>
                <div className="col center">{acc}</div>
                <div className="col center">{pp}</div>
            </div>
            <div className="row" style={{ marginLeft: '7%' }}>
                {description}
            </div>
        </div>
    );
};

type Props = {
    pokemon: string,
}

type State = {
    moves: Array<any>,
}

class MoveList extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);

        this.state = { moves: ['empty'] };
    }

    componentDidMount() {
        this.updateMoveList();
    }

    static getDerivedStateFromProps() {
        return { moves: ['empty'] };
    }

    componentDidUpdate() {
        const { moves } = this.state;
        if (moves.length === 1 && moves[0] === 'empty') {
            this.updateMoveList();
        }
    }

    updateMoveList() {
        const { pokemon } = this.props;
        getAllMovesData(pokemon).then((result) => {
            this.setState({ moves: result });
        });
    }

    createList() {
        const { moves } = this.state;
        const firstFive = moves.slice(0, 5);
        const ml = firstFive.map(move => (
            <Move
              key={move.name}
              name={formatString(move.name)}
              type={move.type.name}
              category={move.damage_class.name}
              basePower={move.power}
              accuracy={move.accuracy}
              pp={move.pp}
              description={filterDescription(move)}
            />));
        return ml;
    }

    render() {
        const { moves } = this.state;
        const header = (
            <div className="row">
                <div className="col center"><h6>Notable Moves:</h6></div>
                <div className="col-10" />
            </div>
        );
        if (moves.length === 0) {
            return (
                <div>
                    {header}
                    <NoMoves />
                </div>
            );
        }
        if (moves.length === 1) {
            return (
                <div>
                    {header}
                    <div style={{ marginLeft: '2%' }}>...</div>
                </div>
            );
        }
        const ml = this.createList();
        return (
            <div className="move-list">
                {header}
                <div className="row">
                    <div className="col" />
                    <div className="col center"><h6>Type</h6></div>
                    <div className="col center"><h6>Category</h6></div>
                    <div className="col center"><h6>Base Power</h6></div>
                    <div className="col center"><h6>Accuracy</h6></div>
                    <div className="col center"><h6>PP</h6></div>
                </div>
                <div>{ml}</div>
            </div>
        );
    }
}

export default MoveList;
