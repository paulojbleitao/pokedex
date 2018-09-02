/* @flow */

import React from 'react';
import { Collapse, Button } from 'reactstrap';

class NoMoves extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        const { collapse } = this.state;
        this.setState({ collapse: !collapse });
    }

    render() {
        const { collapse } = this.state;
        return (
            <div className="no-moves">
                This Pokemon has no notable moves.
                <Button
                  outline
                  color="danger"
                  onClick={this.toggle}
                  size="sm"
                  className="why"
                >
                    Why?
                </Button>
                <Collapse isOpen={collapse} className="explanation">
                    To avoid showing too many moves, only a few competitively
                    viable moves are shown. Those are taken from
                    {' '}
                    <a href="https://www.smogon.com/">Smogon</a>
                    &apos;s Pokedex. If a Pokemon has no notable moves, then
                    most likely there aren&apos;t any movesets registered in
                    Smogon&apos;s database.
                </Collapse>
            </div>
        );
    }
}

export default NoMoves;
