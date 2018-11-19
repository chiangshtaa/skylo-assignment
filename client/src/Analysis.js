import React, { Component } from 'react';

import Graphs from './Graphs.js';

import { connect } from 'react-redux'
import { getData } from './actions'
import store from './index.js';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      startTime: '',
      endTime: '',
      tempEnd: '00:01:23 07/11/2018'
    }

    store.subscribe(() => {
      let range = store.getState().data.range;
      if (range.length === 0) {
        alert('No data between these times!');
        let slider = document.getElementsByClassName('slider');
        let playControls = document.getElementsByClassName('play-controls');
        // let display = document.getElementsByClassName('display');
        let play = document.getElementsByClassName('play');
        slider[0].style.display = 'none';
        playControls[0].style.display = 'none';
        // display[0].style.display = 'none';
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
    console.log('e.target', e.target.value)
    this.setState({
      start: e.target.value
    })
  }

  changeEnd(e) {
    this.setState({
      end: e.target.value
    })
  }

  changeStartTime(e) {
    console.log('start time', e.target.value);
    this.setState({
      startTime: e.target.value
    })
  }

  changeEndTime(e) {
    console.log('end time', e.target.value);
    this.setState({
      endTime: e.target.value
    })
  }


  getData() {
    console.log('start', this.state.start, this.state.end);
    if (this.state.start === '' || this.state.end === '') {
      alert('Please enter valid dates');
      return;
    }
    // let start = this.state.start === '' ? '13:02:43 20/10/2018' : this.state.start;
    // let [startTime, startDate] = start.split(' ');
    // startDate = startDate.replace(/\//g, '-').split('-').reverse().join('-');
    // startTime = startTime + '.000';

    // let end = this.state.end === '' ? '13:02:43 20/10/2018' : this.state.end;
    // let [endTime, endDate] = end.split(' ');
    // endDate = endDate.replace(/\//g, '-').split('-').reverse().join('-');
    // endTime = endTime + '.000';

    // console.log(startTime, startDate);
    // console.log(endTime, endDate);

    // let startTime = '00:00:00.000';
    // let endTime = '00:00:00.000';


    let startTime = this.state.startTime === '' ? '00:00:00.000Z' : this.state.startTime + ':00.000Z';
    let endTime = this.state.endTime === '' ? '00:00:00.000' : this.state.endTime + ':00.000';
    let startResult = `${this.state.start}T${startTime}`;
    let endResult = `${this.state.end}T${endTime}`;
    console.log(startResult, endResult);
    // let startResult = `${startDate}T${startTime}Z`;
    // let endResult = `${endDate}T${endTime}`;

    this.props.dispatch(getData(startResult, endResult));



    let slider = document.getElementsByClassName('slider');
    let playControls = document.getElementsByClassName('play-controls');
    // let display = document.getElementsByClassName('display');
    let play = document.getElementsByClassName('play');
    let slow = document.getElementsByClassName('slow');
    let fast = document.getElementsByClassName('fast');
    slider[0].style.display = 'block';
    playControls[0].style.display = 'flex';
    // display[0].style.display = 'block';
    play[0].style.display = 'block';
    slow[0].style.display = 'block';
    fast[0].style.display = 'block';
  }

  render() {
    return (
      <div className='graphs-container'>
        <div className="inputs-container">
          <div className="inputs">
            <label className="label">Start: </label>
            <input
              className="start"
              placeholder="Pick start date"
              name=""
              size="24"
              type="date"
              onChange={(e) => this.changeStart(e)}
            />
            <input
              className="end"
              type="time"
              onChange={(e) => this.changeStartTime(e)}
            />
          </div>
          <br/>
          <div className="inputs">
            <label className="label">End: </label>
            <input
              className="start"
              placeholder="Pick end date"
              name=""
              size="24"
              type="date"
              onChange={(e) => this.changeEnd(e)}
            />
            <input
              className="end"
              type="time"
              onChange={(e) => this.changeEndTime(e)}
            />
          </div>
          <button className="go" onClick={() => this.getData()} type='button'>Go</button>
        </div>
        <Graphs/>
      </div>
    )
  }
}


export default connect()(Analysis);
          {/*<label>Start: </label>
          <input 
            className="start"
            placeholder="HH:MM:SS DD/MM/YYYY" 
            name="" 
            size="21" 
            type="text" 
            onChange={(e) => this.changeStart(e)}
          />

          <label>End: </label>
          <input 
            className="end"
            placeholder="HH:MM:SS DD/MM/YYYY" 
            name="" 
            size="21" 
            type="text" 
            onChange={(e) => this.changeEnd(e)}
          />*/}