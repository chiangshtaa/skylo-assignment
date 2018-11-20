import React, { Component } from 'react';

import Graphs from './Graphs.js';

import { connect } from 'react-redux'
import { getData } from './actions'
import store from './index.js';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      startTime: '',
      endTime: '',
      tempEnd: '00:01:23 07/11/2018',
      startDate: new Date(),
      endDate: new Date()
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
    if (this.state.startDate === '' || this.state.endDate === '') {
      alert('Please enter valid dates');
      return;
    }

    let monthStart = (this.state.startDate.getMonth() + 1).toString();
    let dayStart = this.state.startDate.getDate().toString();
    let yearStart = this.state.startDate.getFullYear().toString();

    if (monthStart.length !== 2) {
      monthStart = '0' + monthStart;
    }
    if (dayStart.length !== 2) {
      dayStart = '0' + dayStart;
    }

    console.log('month start', monthStart);
    console.log('day start', dayStart);
    console.log('year start', yearStart);

    let monthEnd = (this.state.endDate.getMonth() + 1).toString();
    let dayEnd = this.state.endDate.getDate().toString();
    let yearEnd = this.state.endDate.getFullYear().toString();

    if (monthEnd.length !== 2) {
      monthEnd = '0' + monthEnd;
    }
    if (dayEnd.length !== 2) {
      dayEnd = '0' + dayEnd;
    }

    console.log('month end', monthEnd);
    console.log('day end', dayEnd);
    console.log('year end', yearEnd);

    let startResult = `${yearStart}-${monthStart}-${dayStart}T00:00:00.000Z`
    let endResult = `${yearEnd}-${monthEnd}-${dayEnd}T23:59:59.000`





    console.log(startResult, endResult);
    this.props.dispatch(getData(startResult, endResult));








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


    // let startTime = this.state.startTime === '' ? '00:00:00.000Z' : this.state.startTime + ':00.000Z';
    // let endTime = this.state.endTime === '' ? '00:00:00.000' : this.state.endTime + ':00.000';
    // let startResult = `${this.state.start}T${startTime}`;
    // let endResult = `${this.state.end}T${endTime}`;
    // let startResult = `${startDate}T${startTime}Z`;
    // let endResult = `${endDate}T${endTime}`;



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

  handleStart(date) {
    console.log('start date', date);
    this.setState({
      startDate: date
    })
  }

  handleEnd(date) {
    console.log('end date', date.getDate());
    this.setState({
      endDate: date
    })
  }

  render() {
    return (
      <div className='graphs-container'>
        <div className="inputs-container">
          <div className="inputs">
            <label className="label">Start: </label>
            <DatePicker
              selected={this.state.startDate}
              onChange={(date) => this.handleStart(date)}
            />
            {/*<input
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
            />*/}
          </div>
          <br/>
          <div className="inputs">
            <label className="label">End: </label>
            <DatePicker
              selected={this.state.endDate}
              onChange={(date) => this.handleEnd(date)}
            />
            {/*<input
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
            />*/}
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