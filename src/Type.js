import React from 'react';
import { formatString } from './util/util';

const Type = ({type}) => (
    <span className={`badge badge-primary ${type}`}>{formatString(type)}</span>
)

const typesArray = (types) => {
    types = types.sort((a,b) => {
        return a.slot - b.slot;
    });

    return types.map(type => <Type key={type.slot} type={type.type.name} />);
}

export default typesArray;