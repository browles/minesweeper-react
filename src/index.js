import './scss/styles.scss';
import Game from './js/components/Game.js';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Game style={{
        top: '10px',
        left: '50%',
        transform: 'translate(-50%, 0%) scale(1.5,1.5)',
        transformOrigin: '50% 0%'
      }} />, document.getElementById('app'));
