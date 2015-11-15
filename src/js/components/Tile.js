import React from 'react';
import MouseDownMoveMixin from '../mixins/MouseDownMoveMixin.js'
import {BLANK, PROGRESS} from '../minesweeper.js';

// Maps props.cell to the correct spritesheet offset
const classMap = {
  'bomb-x': 'tile-bomb-x',
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
  mixins: [MouseDownMoveMixin],
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.mouse !== nextState.mouse) {
      this.props.handleMouseDownMove(nextState.mouse);
    }
    return true;
  },
  render() {
    let className = 'tile ' + classMap[this.props.cell];
    if (this.props.cell === BLANK && this.state.mouse) className += '-down';

    return (
      <div
        {...this.props}
        className={className}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onContextMenu={this.props.handleContextMenu}
      />
    );
  }
});

export default Tile;
