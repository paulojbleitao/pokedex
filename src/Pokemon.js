/* @flow */

import React from 'react';
import Abilities from './Ability';
import typesArray from './Type';
import EvolutionChain from './EvolutionChain';
import { formatString } from './util/util';

const Pokemon = ({ data } : any) => (
    <div className="jumbotron">
        <div className="container">
            <div className="row">
                <Name
                  name={formatString(data.forms[0].name)}
                  number={data.id}
                />
            </div>
            <div className="row">
                <div className="col center">
                    <img
                      className="main"
                      src={data.sprites.front_default}
                      alt=""
                    />
                    <div>
                        {typesArray(data.types)}
                    </div>
                </div>
                <div className="col-8">
                    <Abilities abilities={data.abilities} />
                </div>
            </div>
            <div className="row">
                <div className="col center">
                    <EvolutionChain pokemon={data} />
                </div>
                <div className="col" />
                <div className="col" />
            </div>
        </div>
    </div>
);

type NameProps = {
    name: string,
    number: number,
};

const Name = ({ name, number } : NameProps) => (
    <h3 className="name">
        #
        {number}
        {' '}
        {name}
    </h3>
);

export default Pokemon;
