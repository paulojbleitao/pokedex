/* @flow */

import React from 'react';
import { formatString } from './util/util';

type Props = {
    type: string,
};

type PokemonType = {
    slot: number,
    type: {
        url: string,
        name: string,
    },
};

const Type = ({ type }: Props) => (
    <span className={`badge badge-primary ${type}`}>{formatString(type)}</span>
);

const typesArray = (types : Array<PokemonType>) : Array<Type> => {
    const sortedTypes = types.sort((a, b) => a.slot - b.slot);

    return sortedTypes.map(type => (
        <Type key={type.slot} type={type.type.name} />));
};

export default typesArray;
