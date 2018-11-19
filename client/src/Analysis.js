import React, { Component } from 'react';

import Graphs from './Graphs.js';

import { connect } from 'react-redux'
import { getData } from './actions'
import store from './index.js';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '13:02:43 20/10/2018',
      end: '00:01:23 07/11/2018'
    }
    store.subscribe(() => {
      let range = store.getState().data.range;
      if (range.length === 0) {
        alert('No data between these times!');
        let slider = document.getElementsByClassName('slider');
        let playControls = document.getElementsByClassName('play-controls');
        let display = document.getElementsByClassName('display');
        let play = document.getElementsByClassName('play');
        slider[0].style.display = 'none';
        playControls[0].style.display = 'none';
        display[0].style.display = 'none';
        play[0].style.display = 'none';
      }
        // let slider = document.getElementsByClassName('slider');
        // let playControls = document.getElementsByClassName('play-controls');
        // let display = document.getElementsByClassName('display');
        // let play = document.getElementsByClassName('play');
        // slider[0].style.display = 'block';
        // playControls[0].style.display = 'flex';
        // display[0].style.display = 'block';
        // play[0].style.display = 'block';
    })

  }

  changeStart(e) {
    this.setState({
      start: e.target.value
    })
  }

  changeEnd(e) {
    this.setState({
      end: e.target.value
    })
  }

  getData() {

    let start = this.state.start;
    let [startTime, startDate] = start.split(' ');
    startDate = startDate.replace(/\//g, '-').split('-').reverse().join('-');
    startTime = startTime + '.000';

    let end = this.state.end;
    let [endTime, endDate] = end.split(' ');
    endDate = endDate.replace(/\//g, '-').split('-').reverse().join('-');
    endTime = endTime + '.000';

    console.log(endTime, endDate);

    let startResult = `${startDate}T${startTime}Z`;
    let endResult = `${endDate}T${endTime}`;
    this.props.dispatch(getData(startResult, endResult));
    // this.props.dispatch(getData());
    let slider = document.getElementsByClassName('slider');
    let playControls = document.getElementsByClassName('play-controls');
    let display = document.getElementsByClassName('display');
    let play = document.getElementsByClassName('play');
    slider[0].style.display = 'block';
    playControls[0].style.display = 'flex';
    display[0].style.display = 'block';
    play[0].style.display = 'block';
  }

  render() {
    return (
      <div className='graphs-container'>
        <div className="inputs">
          <label>To</label>
          <input 
            placeholder="HH:MM:SS DD/MM/YYYY" 
            name="" 
            size="21" 
            type="text" 
            onChange={(e) => this.changeStart(e)}
          />

          <label>From</label>
          <input 
            placeholder="HH:MM:SS DD/MM/YYYY" 
            name="" 
            size="21" 
            type="text" 
            onChange={(e) => this.changeEnd(e)}
          />
          <button onClick={() => this.getData()} type='button'>Go</button>
        </div>
        <Graphs/>
      </div>
    )
  }
}


export default connect()(Analysis);