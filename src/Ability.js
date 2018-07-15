import React from 'react';
import { formatString } from './util';

const Ability = ({ability}) => {
    if (ability.is_hidden) {
        return (
            <div>
                {formatString(ability.ability.name)} (Hidden)
            </div>);
    } else {
        return (
            <div>
                {formatString(ability.ability.name)}
            </div>);
    }
}

const abilitiesArray = (abilities) => {
    abilities = abilities.sort((a,b) => {
        return a.slot - b.slot;
    });
    
    return abilities.map(ability => <Ability key={ability.slot} ability={ability}/>);
}

export default abilitiesArray;
