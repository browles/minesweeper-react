import React from 'react';

// Maps props.number to the correct spritesheet offset
const numMap = {
  '-': 'num-dash',
  '0': 'num-zero',
  '1': 'num-one',
  '2': 'num-two',
  '3': 'num-three',
  '4': 'num-four',
  '5': 'num-five',
  '6': 'num-six',
  '7': 'num-seven',
  '8': 'num-eight',
  '9': 'num-nine',
};

const Ticker = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.number !== this.props.number;
  },
  render() {
    let {number} = this.props;
    let isPositive = number >= 0;
    number = Math.max(number, -99);
    number = Math.min(number, 999);
    number = Math.abs(number);
    let timeHundreds = isPositive ? number / 100 | 0 : '-';
    let timeTens = (number % 100) / 10 | 0;
    let timeOnes = number % 10;

    let hundredsClass = 'num ' + numMap[timeHundreds];
    let tensClass = 'num ' + numMap[timeTens];
    let onesClass = 'num ' + numMap[timeOnes];

    return (
      <div {...this.props}>
        <div className={hundredsClass} />
        <div className={tensClass} />
        <div className={onesClass} />
      </div>
    );
  }
});

export default Ticker;
