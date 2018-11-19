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
      range = range.map((entry, i) => {
        return {
          ...entry,
          index: i
        }
      })
      range = range.slice(middle, middle + 25);
      let signalObj = {};
      let speedObj = {};
      range.forEach((entry) => {
        signalObj[`${entry.index}`] = entry.rssi;
        speedObj[`${entry.index}`] = entry.speed;


        // signalObj[`${index}`] = entry.rssi;
        // speedObj[`${index}`] = entry.speed;
      })
      let accObj = {};
      for (let i = 1; i < range.length; i++) {
        // accObj[`${i}`] = range[i].speed / (range[i].timestamp - range[i - 1].timestamp);
        accObj[`${range[i].index}`] = range[i].speed / (range[i].timestamp - range[i - 1].timestamp);
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
          <LineChart xtitle="Time" ytitle="Signal Strength" data={this.state.signalStrength} height="100%"/>
        </div>
        <div className="speed">
          <LineChart xtitle="Time" ytitle="Speed" data={this.state.speed} height="100%"/>
        </div>
        <div className="acceleration">
          <LineChart xtitle="Time" ytitle="Acceleration" data={this.state.acceleration} height="100%"/>
        </div>
      </div>
    )
  }
}


export default connect()(Graphs);