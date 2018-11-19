import React, { Component } from 'react';

import { connect } from 'react-redux'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import store from './index.js';

ReactChartkick.addAdapter(Chart)

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signalStrength: {},
      speed: {},
      acceleration: {}
    }

    store.subscribe(() => {
      let range = store.getState().data.range;
      let middle = store.getState().updateTime.index;
      middle = Number(middle);
      range = range.slice(middle, middle + 25);
      let signalObj = {};
      let speedObj = {};
      range.forEach((entry, index) => {
        signalObj[`${index}`] = entry.rssi;
        speedObj[`${index}`] = entry.speed;
      })
      let accObj = {};
      for (let i = 1; i < range.length; i++) {
        accObj[`${i}`] = range[i].speed / (range[i].timestamp - range[i - 1].timestamp);
      }
      this.setState({
        signalStrength: signalObj,
        speed: speedObj,
        acceleration: accObj
      })
    })
  }
  render() {
    return (
      <div className="graphs">
        <div className="signal-strength">
          <LineChart data={this.state.signalStrength} height="100%"/>
        </div>
        <div className="speed">
          <LineChart data={this.state.speed} height="100%"/>
        </div>
        <div className="acceleration">
          <LineChart data={this.state.acceleration} height="100%"/>
        </div>
      </div>
    )
  }
}


export default connect()(Graphs);