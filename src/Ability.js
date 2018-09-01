/* @flow */

import React from 'react';
import { formatString } from './util/util';

type AbilityType = {
    slot: number,
    is_hidden: boolean,
    ability: {
        url: string,
        name: string,
    },
};

type Props = {
    ability: AbilityType,
};

const Ability = ({ ability } : Props) => {
    const hidden = ability.is_hidden ? '(Hidden)' : null;
    return (
        <div>
            {formatString(ability.ability.name)}
            {' '}
            {hidden}
        </div>);
};

const abilitiesArray = (abilities: Array<AbilityType>) : Array<Ability> => {
    const sortedAbilities = abilities.sort((a, b) => a.slot - b.slot);

    return sortedAbilities.map(ability => (
        <Ability key={ability.slot} ability={ability} />
    ));
};

export default abilitiesArray;
