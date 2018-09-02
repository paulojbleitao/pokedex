/* @flow */

import React from 'react';
import axios from 'axios';
import { formatString, abilityOrAbilities } from './util/util';
import BASE_URL from './util/baseUrl';

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

type State = {
    description: string,
};

async function getAbilityDescription(ability: string) {
    const a = await axios.get(`${BASE_URL}/ability/${ability}`);
    const description = a.data.effect_entries.filter(r => (
        r.language.name === 'en'
    ));
    return description[0].short_effect;
}

class Ability extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = { description: '...' };
    }

    componentDidMount() {
        this.updateDescription();
    }

    static getDerivedStateFromProps() {
        return { description: '...' };
    }

    componentDidUpdate() {
        const { description } = this.state;
        if (description === '...') {
            this.updateDescription();
        }
    }

    updateDescription() {
        const { ability } = this.props;
        getAbilityDescription(ability.ability.name)
            .then((result) => {
                this.setState({ description: result });
            });
    }

    render() {
        const { ability } = this.props;
        const { description } = this.state;
        const hidden = ability.is_hidden ? ' (Hidden)' : null;
        return (
            <div className="ability">
                <b>
                    {formatString(ability.ability.name)}
                    {hidden}
                    :
                </b>
                {' '}
                {description}
            </div>);
    }
}

const abilitiesArray = (abilities: Array<AbilityType>) : Array<Ability> => {
    const sortedAbilities = abilities.sort((a, b) => a.slot - b.slot);

    return sortedAbilities.map(ability => (
        <Ability key={ability.slot} ability={ability} />
    ));
};

type AbilitiesProps = {
    abilities: Array<AbilityType>,
};

const Abilities = ({ abilities }: AbilitiesProps) => (
    <div>
        <h5>
            {abilityOrAbilities(abilities)}
            :
        </h5>
        <div>
            {abilitiesArray(abilities)}
        </div>
    </div>
);

export default Abilities;
