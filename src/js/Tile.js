import React from 'react';
import {BLANK, PROGRESS} from './minesweeper.js';

const classMap = {
  'bomb-x': 'time-bomb-x',
  'bomb-red': 'tile-bomb-red',
  'bomb': 'tile-bomb',
  '-3': 'tile-question',
  '-2': 'tile-flag',
  '-1': 'tile-blank',
  '0': 'tile-blank-down',
  '1': 'tile-one',
  '2': 'tile-two',
  '3': 'tile-three',
  '4': 'tile-four',
  '5': 'tile-five',
  '6': 'tile-six',
  '7': 'tile-seven',
  '8': 'tile-eight',
};

const Tile = React.createClass({
  getInitialState() {
    return {
      mouse: false
    };
  },
  handleMouseDown(ev) {
    if (this.props.status !== PROGRESS) return;
    this.setState({mouse: true});
  },
  handleMouseMove(ev) {
    if (this.props.status !== PROGRESS) return;
    if (ev.buttons === 1) this.setState({mouse: true});
  },
  handleMouseLeave(ev) {
    if (this.props.status !== PROGRESS) return;
    if (this.state.mouse) this.setState({mouse: false});
  },
  render() {
    let className = 'tile ' + classMap[this.props.cell];
    if (this.props.cell === BLANK && this.state.mouse) className += '-down';

    return (
      <div
        {...this.props}
        className={className}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
});

export default Tile;