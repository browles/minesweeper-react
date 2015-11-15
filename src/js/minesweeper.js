import Immutable from 'immutable';
import {repeat, range, shuffle} from './utils.js'

const BOMB = -1;
const BLANK = -1;
const FLAG = -2;
const QUESTION = -3;
const LOSE = -1;
const PROGRESS = 0;
const WIN = 1;

// Generate a one dimensional array maintaining bomb locations and
// neighboring bomb counts for all non-bomb elements
function newMinefield(rows, cols, num) {
  const len = rows * cols;
  const minefield = repeat(0, len);

  const bombIndices = shuffle(range(0, len)).slice(0, Math.min(num, len));
  bombIndices.forEach(i => {
    minefield[i] = BOMB;
  });

  function updateNeighborAt(index) {
    // Bounds check
    if (index < 0 || index >= len) return;
    // If neighbor is a bomb, return
    else if (minefield[index] === BOMB) return;
    minefield[index]++;
  }

  bombIndices.forEach(i => {
    // For each bomb index, update counts of all in-bounds, non-bomb neighbors
    if (i % cols !== 0) {
      updateNeighborAt(i - 1);
      updateNeighborAt(i - cols - 1);
      updateNeighborAt(i + cols - 1);
    }
    updateNeighborAt(i - cols);
    updateNeighborAt(i + cols);
    if (i % cols !== cols - 1) {
      updateNeighborAt(i + 1);
      updateNeighborAt(i - cols + 1);
      updateNeighborAt(i + cols + 1);
    }
  });

  return minefield;
}

// Generate a new immutable, one dimensional array to maintain current status of the game board
function newBoard(rows, cols) {
  const board = repeat(BLANK, rows * cols);
  return Immutable.fromJS(board);
}

const minesweeper = {
  // Initialize a new game
  init(rows, cols, num) {
    num = Math.min(rows * cols, num);
    const patch = {
      rows,
      cols,
      board: newBoard(rows, cols, num),
      minefield: newMinefield(rows, cols, num),
      flags: num,
      bombs: num,
      remaining: rows * cols,
      status: PROGRESS
    };

    return minesweeper.update({}, patch);
  },
  // Return a new state object reflecting patch updates to prevState
  update(prevState, patch) {
    return {
      rows: patch.rows != null ? patch.rows : prevState.rows,
      cols: patch.cols != null ? patch.cols : prevState.cols,
      board: patch.board != null ? patch.board : prevState.board,
      minefield: patch.minefield != null ? patch.minefield : prevState.minefield,
      flags: patch.flags != null ? patch.flags : prevState.flags,
      bombs: patch.bombs != null ? patch.bombs : prevState.bombs,
      remaining: patch.remaining != null ? patch.remaining : prevState.remaining,
      status: patch.status != null ? patch.status : prevState.status
    };
  },
  // Update state.board to be revealed starting at index
  reveal(state, index) {
    let {cols, board, minefield, remaining} = state;
    // Bounds check
    if (index < 0 || index >= minefield.length) return state;
    // If game not currently in progress
    else if (state.status !== PROGRESS) return state;
    // If flagged or revealed, do nothing
    else if (board.get(index) === FLAG || board.get(index) >= 0) return state;
    // If bomb, set status to -1 to indicate loss
    else if (minefield[index] === BOMB) return minesweeper.update(state, {status: LOSE});
    else {
      board = board.withMutations(list => {
        function revealListAt(index) {
          // Bounds check
          if (index < 0 || index >= minefield.length) return;
          // If flagged or revealed, do nothing
          else if (list.get(index) === FLAG || list.get(index) >= 0) return;

          list.set(index, minefield[index]);
          remaining--;

          if (minefield[index] === 0) {
            if (index % cols !== 0) {
              revealListAt(index - 1);
              revealListAt(index - cols - 1);
              revealListAt(index + cols - 1);
            }
            revealListAt(index - cols);
            revealListAt(index + cols);
            if (index % cols !== cols - 1) {
              revealListAt(index + 1);
              revealListAt(index - cols + 1);
              revealListAt(index + cols + 1);
            }
          }
        }

        revealListAt(index);
      });

      return minesweeper.update(state, {board, remaining});
    }
  },
  // Update state.board to be flagged/question marked/undecorated at index
  flag(state, index) {
    let {cols, board, minefield, flags} = state;
    // Bounds check
    if (index < 0 || index >= minefield.length) return state;
    // If game not currently in progress
    else if (state.status !== PROGRESS) return state;
    // If revealed
    else if (board.get(index) >= 0) return state;
    else {
      board = board.update(index, val => {
        // If unrevealed
        if (val === BLANK) flags--;
        // If flag
        else if (val === FLAG) flags++;

        // Cycle through unrevealed, flag, and question mark
        return val % -3 - 1;
      });

      return minesweeper.update(state, {board, flags});
    }
  },
  // Verify all possible tiles have been revealed
  validate(state) {
    if (state.remaining === state.bombs) return minesweeper.update(state, {status: WIN});
    else return minesweeper.update(state, {status: LOSE});
  }
}

export {minesweeper, BOMB, BLANK, FLAG, QUESTION, WIN, PROGRESS, LOSE};
