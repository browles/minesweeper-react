import React from 'react';
import Tile from './Tile.js';
import {
  minesweeper,
  BOMB,
  BLANK,
  FLAG,
  QUESTION,
  WIN,
  PROGRESS,
  LOSE
} from './minesweeper.js';

const Game = React.createClass({
  getInitialState() {
    return {
      game: minesweeper.init(8, 8, 10),
      lastReveal: null,
      cheat: false
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.game !== this.state.game;
  },
  reveal(index, ev) {
    ev.preventDefault();
    if (this.state.game.status !== PROGRESS) return;
    if (ev.buttons === 0) {
      this.setState({
        lastReveal: index,
        game: minesweeper.reveal(this.state.game, index)
      });
    }
    else {
      this.setState({
        lastReveal: index,
        game: minesweeper.flag(this.state.game, index)
      });
    }
  },
  render() {
    const cols = this.state.game.cols;
    const cheat = this.state.cheat;
    const {board, minefield, status} = this.state.game;
    return (
      <div>
        {
          board.toArray().map((val, i) => {
            if (status === LOSE || cheat) {
              if (minefield[i] === BOMB && val !== FLAG) val = 'bomb';
              else if (minefield[i] !== BOMB && val === FLAG) val = 'bomb-x';
              if (this.state.lastReveal === i) val = 'bomb-red';
            }

            let style = {
              left: 100 + (i % cols) * 16,
              top: (i / cols | 0) * 16
            };

            return (
              <Tile
                status={status}
                cell={val}
                style={style}
                key={i}
                onMouseUp={this.reveal.bind(this, i)}/>
              );
          })
        }
      </div>
    );
  }
});

export default Game;
