import React from 'react';
import SpinnerIcon from './SpinnerIcon';

const Spinner = () => (
    <div style={{
        display: 'flex',
        justify: 'center',
        padding: {
            top: '10px',
        },
        }}
    >
        <SpinnerIcon />
    </div>
);

export default Spinner;
