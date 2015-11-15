import {PROGRESS} from '../minesweeper.js';

export default {
  getInitialState() {
    return {
      mouse: false
    };
  },
  handleMouseDown(ev) {
    ev.preventDefault();
    if (this.props.status !== PROGRESS) return;
    this.setState({mouse: true});
  },
  handleMouseUp(ev) {
    if (this.props.status !== PROGRESS) return;
    this.setState({mouse: false});
    if (this.props.handleMouseUp) this.props.handleMouseUp(ev);
  },
  handleMouseMove(ev) {
    ev.preventDefault();
    if (this.props.status !== PROGRESS) return;
    if (ev.buttons === 1) this.setState({mouse: true});
  },
  handleMouseLeave(ev) {
    if (this.props.status !== PROGRESS) return;
    if (this.state.mouse) this.setState({mouse: false});
  }
};
