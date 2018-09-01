/* @flow */

import React from 'react';
import abilitiesArray from './Ability';
import typesArray from './Type';
import EvolutionChain from './EvolutionChain';
import { formatString, abilityOrAbilities } from './util/util';

const Pokemon = ({ data } : any) => (
    <div className="jumbotron">
        <div className="container">
            <div className="row">
                <div className="col center">
                    <img
                      className="main"
                      src={data.sprites.front_default}
                      alt=""
                    />
                </div>
                <div className="col">
                    <Card
                      category="Name"
                      content={formatString(data.forms[0].name)}
                    />
                </div>
                <div className="col">
                    <Card
                      category={abilityOrAbilities(data.abilities)}
                      content={abilitiesArray(data.abilities)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col center">
                    <EvolutionChain pokemon={data} />
                    {typesArray(data.types)}
                </div>
                <div className="col" />
                <div className="col" />
            </div>
        </div>
    </div>
);

type CardProps = {
    category: string,
    content: any, // this needs fixing
};

const Card = ({ category, content } : CardProps) => (
    <div className="card">
        <div className="card-header">
            {category}
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">{content}</li>
        </ul>
    </div>
);

export default Pokemon;
