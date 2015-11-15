import React from 'react';
import Menu from './Menu.js';
import Header from './Header.js';
import Board from './Board.js';
import {minesweeper, WIN, PROGRESS, LOSE} from '../minesweeper.js';

function newGame(rows, cols, num) {
  return {
    // The current game board
    game: minesweeper.init(rows, cols, num),
    // Cheat mode active
    cheat: false,
    // Game has started
    started: false,
    // Current elapsed game time since start
    time: 0,
    // The last revealed tile, used to color tile red on loss
    lastReveal: null,
    // Player is selecting a tile, used to trigger 'uh-oh' face
    playerIsSelecting: false
  };
}

const Game = React.createClass({
  getInitialState() {
    return newGame(8, 8, 10);;
  },
  componentWillMount() {
    this._timer = null;
  },
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.game.status !== PROGRESS) this.stopTimer();
    return true;
  },
  componentWillUnmount() {
    this.stopTimer();
  },
  startTimer() {
    this.setState({started: true});
    this._timer = setInterval(() => {
        this.setState({time: this.state.time + 1});
    }, 1000);
  },
  stopTimer() {
    clearInterval(this._timer);
    this._timer = null;
  },
  startNewGame(rows, cols, num) {
    this.stopTimer();
    this.setState(newGame(rows, cols, num));
  },
  validateOrReset() {
    // If playing, check to see if we win or lose
    if (this.state.game.status === PROGRESS) {
      this.stopTimer();
      this.setState({
        lastReveal: null,
        game: minesweeper.validate(this.state.game)
      });
    }
    // Otherwise reset the game
    else {
      const {rows, cols, bombs} = this.state.game;
      this.startNewGame(rows, cols, bombs);
    }
  },
  toggleCheat() {
    this.setState({cheat: !this.state.cheat});
  },
  mightReveal(mouseIsDown) {
    if (this.state.game.status === PROGRESS) {
      this.setState({playerIsSelecting: mouseIsDown});
    }
  },
  reveal(index, ev) {
    ev.preventDefault();
    if (this.state.game.status !== PROGRESS) return;
    if (this.state.started === false) this.startTimer();
    if (ev.button !== 2) {
      this.setState({
        lastReveal: index,
        game: minesweeper.reveal(this.state.game, index)
      });
    }
  },
  flag(index, ev) {
    ev.preventDefault();
    if (this.state.game.status !== PROGRESS) return;
    if (this.state.started === false) this.startTimer();
    if (ev.button === 2) {
      this.setState({
        lastReveal: null,
        game: minesweeper.flag(this.state.game, index)
      });
    }
  },
  render() {
    const width = this.state.game.cols * 16;
    const height = this.state.game.rows * 16;
    const border = 8;
    return (
      <div className='thin container' style={this.props.style}>
        <Menu
          style={{width: '100%', borderBottom: '1px solid'}}
          handleSubmit={this.startNewGame}
          handleCheatClick={this.toggleCheat}
        />
        <div className='outset' style={{
          background: '#bbb',
          width: 2 * border + width,
          height: 58 + height
        }}>
          <Header
            className='inset align-center'
            style={{
              width: width,
              height: 31,
              marginTop: border - 2
            }}
            {...this.state}
            handleClick={this.validateOrReset}
          />
          <Board
            className='inset align-center-bottom'
            style={{
              position: 'absolute',
              top: `calc(100% - ${border}px)`,
              width: width,
              height: height
            }}
            {...this.state}
            handleMouseUp={this.reveal}
            handleContextMenu={this.flag}
            handleMouseDownMove={this.mightReveal}
          />
        </div>
      </div>
    );
  }
});

export default Game;
