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
      acceleration: {},
      total: [],
      currSignal: {},
      currSpeed: {},
      currAcceleration: {}
    }

    store.subscribe(() => {
      let total = store.getState().data.range;
      console.log('SUBSCRIBE', total);
      let middle = store.getState().updateTime.index;
      middle = Number(middle);
      let range = total.map((entry, i) => {
        return {
          ...entry,
          index: i
        }
      })

      // let start = middle - 5 >= 0 ? middle - 5: 0;
      range = range.slice(middle, middle + 25);

      let signalObj = {};
      let speedObj = {};
      range.forEach((entry) => {
        signalObj[`${entry.index}`] = entry.rssi;
        speedObj[`${entry.index}`] = entry.speed;


        // signalObj[`${index}`] = entry.rssi;
        // speedObj[`${index}`] = entry.speed;
      })
      let currentTime = range[0];
      // console.log('range range range', range, currentTime);
      // console.log('range range range', range);
      if (!currentTime) {
        this.setState({
          signalStrength: {},
          speed: {},
          acceleration: {},
          total: total,
          currSignal: {},
          currSpeed: {},
          currAcceleration: {}
        })
        return;
      }
      let currSignal = {};
      let currSpeed = {};
      let currAcceleration = {};
      currSignal[currentTime.index] = currentTime.rssi;
      currSpeed[currentTime.index] = currentTime.speed;

      let accObj = {};
      let i;
      for (i = 1; i < range.length; i++) {
        let timeDiffInSeconds = (range[i].timestamp - range[i - 1].timestamp) / ( 1000 );
        let speedDiff = range[i].speed - range[i - 1].speed;
        // accObj[`${i}`] = range[i].speed / (range[i].timestamp - range[i - 1].timestamp);
        // accObj[`${range[i].index}`] = range[i].speed / (range[i].timestamp - range[i - 1].timestamp); // dividing by milliseconds
        accObj[`${range[i - 1].index}`] = speedDiff / timeDiffInSeconds; // 
      }
      // i--;
      if (range.length < 2) {
        currAcceleration[currentTime.index] = 0;
      } else {
        currAcceleration[currentTime.index] =  (range[1].speed - range[0].speed) / ((range[1].timestamp - range[0].timestamp) / 1000);
      }
      // console.log('total', total, this.state.total);

      if (total.length !== this.state.total.length || total.length === 0) {
        this.setState({
          signalStrength: {},
          speed: {},
          acceleration: {},
          total: total,
          currSignal: {},
          currSpeed: {},
          currAcceleration: {}
        })
      } else {
        this.setState({
          signalStrength: signalObj,
          speed: speedObj,
          acceleration: accObj,
          total: total,
          currSignal: currSignal,
          currSpeed: currSpeed,
          currAcceleration: currAcceleration
        })
      }
    })
  }
//  data = [
//   {"name":"Workout", "data": {"2017-01-01": 3, "2017-01-02": 4, ...}},
//   {"name":"current", "data": {"2017-01-01": 5, "2017-01-02": 3, ...}}
// ];
  render() {
    const signalData = [
      {'name': 'current', 'data': this.state.currSignal},
      {'name': 'plot', 'data': this.state.signalStrength}
    ];

    const speedData = [
      {'name': 'current', 'data': this.state.currSpeed},
      {'name': 'plot', 'data': this.state.speed}
    ];

    const accelerationData = [
      {'name': 'current', 'data': this.state.currAcceleration},
      {'name': 'plot', 'data': this.state.acceleration}
    ];

    console.log('signal data', signalData);
    return (
      <div className="graphs">
        <div className="signal-strength">
          {<LineChart min={0} max={4} legend={false} colors={["red", "blue"]} xtitle="Time" ytitle="Signal Strength" data={signalData} height="100%"/>}
          {/*<LineChart xtitle="Time" ytitle="Signal Strength" data={this.state.signalStrength} height="100%"/>*/}
        </div>
        <div className="speed">
          <LineChart min={0} max={80} legend={false} colors={["red", "blue"]} xtitle="Time" ytitle="Speed" data={speedData} height="100%"/>
          {/*<LineChart legend={false} colors={["red", "blue"]} xtitle="Time" ytitle="Speed" data={this.state.speed} height="100%"/>*/}
        </div>
        <div className="acceleration">
          <LineChart legend={false} colors={["red", "blue"]} xtitle="Time" ytitle="Acceleration" data={accelerationData} height="100%"/>
          {/*<LineChart legend={false} colors={["red", "blue"]} xtitle="Time" ytitle="Acceleration" data={this.state.acceleration} height="100%"/>*/}
        </div>
      </div>
    )
  }
}


export default connect()(Graphs);