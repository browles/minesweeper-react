import React from 'react';
import Ticker from './Ticker.js';
import Face from './Face.js';

const Header = React.createClass({
  render() {
    return (
      <div {...this.props}>
        <Ticker
          className='ticker align-left'
          number={this.props.game.flags}
        />
        <Face
          style={{width: 24, height: 24, top: 2}}
          status={this.props.game.status}
          isSelecting={this.props.playerIsSelecting}
          className='align-center'
          onClick={this.props.handleClick}
        />
        <Ticker
          className='ticker align-right'
          number={this.props.time}
        />
      </div>
    );
  }
});

export default Header;
