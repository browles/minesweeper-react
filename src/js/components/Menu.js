import React from 'react';

const Menu = React.createClass({
  getInitialState() {
    return {
      open: false,
      rows: 8,
      cols: 8,
      bombs: 10
    };
  },
  handleChange(key, ev) {
    let val = Number(ev.target.value);
    if (!Number.isNaN(val)) this.setState({[key]: val});
  },
  handleSubmit() {
    let {rows, cols, bombs} = this.state;
    if (rows > 0 && cols > 0 && bombs > 0) {
      cols = Math.max(cols, 8);
      this.setState({cols});
      this.props.handleSubmit(rows, cols, bombs);
      this.close();
    }
  },
  handleCheatClick() {
    this.props.handleCheatClick();
    this.close();
  },
  handleKeyPress(ev) {
    if (ev.which === 13) this.handleSubmit();
  },
  open() {
    this.setState({open: true});
  },
  close() {
    this.setState({open: false});
  },
  toggle() {
    if (this.state.open) this.close();
    else this.open();
  },
  render() {
    const display = this.state.open ? 'block' : 'none';
    return (
      <div {...this.props}>
        <span className='toggle-menu' onClick={this.toggle}>Game</span>
        <ul className='menu-list' style={{display: display}}>
            <form className='game-config' onSubmit={this.handleSubmit}>
              <input value={this.state.rows}
                onChange={this.handleChange.bind(null, 'rows')}
                onKeyPress={this.handleKeyPress}
              />
              &times;
              <input value={this.state.cols}
                onChange={this.handleChange.bind(null, 'cols')}
                onKeyPress={this.handleKeyPress}
              />
              {'\uD83D\uDCA3'}
              <input value={this.state.bombs}
                onChange={this.handleChange.bind(null, 'bombs')}
                onKeyPress={this.handleKeyPress}
              />
            </form>
            <li className='menu-item' onClick={this.handleSubmit}>New</li>
            <li className='menu-item' onClick={this.handleCheatClick}>Cheat</li>
        </ul>
      </div>
    );
  }
});

export default Menu;
