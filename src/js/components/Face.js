import React from 'react';
import MouseDownMoveMixin from '../mixins/MouseDownMoveMixin.js'
import {WIN, PROGRESS, LOSE} from '../minesweeper.js';

// Maps props.status to the correct spritesheet offset
const faceMap = {
  [WIN]: 'face-shades',
  [PROGRESS]: 'face-happy',
  [LOSE]: 'face-dead'
};

const Face = React.createClass({
  mixins: [MouseDownMoveMixin],
  render() {
    let faceClass = 'thin face ' + faceMap[this.props.status];
    if (this.props.status === PROGRESS) {
      if (this.props.isSelecting) faceClass = 'thin face face-uhoh';
      else if (this.state.mouse) faceClass += '-down';
    }
    if (this.props.className) faceClass += ' ' + this.props.className;
    return (
      <div
        {...this.props}
        className={faceClass}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
});

export default Face;
