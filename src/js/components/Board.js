import React from 'react';
import Tile from './Tile.js';
import {BOMB, FLAG, WIN, PROGRESS, LOSE} from '../minesweeper.js';

const Board = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.game !== this.props.game || nextProps.cheat !== this.props.cheat;
  },
  render() {
    const cheat = this.props.cheat;
    const {cols, board, minefield, status} = this.props.game;
    return (
      <div {...this.props}>
        {
          board.toArray().map((val, i) => {
            if (status === LOSE || cheat) {
              if (minefield[i] === BOMB && val !== FLAG) val = 'bomb';
              else if (minefield[i] !== BOMB && val === FLAG) val = 'bomb-x';
              if (status === LOSE && this.props.lastReveal === i) val = 'bomb-red';
            }
            else if (status === WIN) {
              if (minefield[i] === BOMB) val = FLAG;
            }

            let style = {
              left: (i % cols) * 16,
              top: (i / cols | 0) * 16
            };

            return (
              <Tile
                status={status}
                cell={val}
                style={style}
                key={i}
                handleMouseUp={this.props.handleMouseUp.bind(null, i)}
                handleContextMenu={this.props.handleContextMenu.bind(null, i)}
                handleMouseDownMove={this.props.handleMouseDownMove}
              />
            );
          })
        }
      </div>
    );
  }
});

export default Board;
