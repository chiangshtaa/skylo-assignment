import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from './index.js';

import { changeTime } from './actions';

import buttonPlay from './css/images/play.png';
import speedButton from './css/images/fast-forward.png';
import buttonPause from './css/images/pause.png';

let increment = 1;
class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: 0,
      timeEnd: 400,
      timeCurrent: 0,
      increment: 1,
      play: false
    }

    store.subscribe(() => {
      let range = store.getState().data.range;
      // console.log('here');
      if (range.length - 1 !== this.state.timeEnd) {
        this.setState({
          timeCurrent: 0,
          timeEnd: range.length - 1
        })
      }
      // this.setState({
      //   timeStart: 0,
      //   timeEnd: range.length - 1
      // })
    })
  }


  changeTime(e) {
    let newTime = e.target.value;
    // console.log('newTime', newTime);
    this.setState({
      timeCurrent: e.target.value
    }, () => this.props.dispatch(changeTime(newTime)))
  }

  automateSlider() {
    console.log('automate');
    let playButton = document.getElementsByClassName('play');
    let pauseButton = document.getElementsByClassName('pause');
    playButton[0].style.display = 'none';
    pauseButton[0].style.display = 'block';
    // console.log('style', playButton[0].style.display);
    this.setState({
      play: true
    })

    this.moveSlider = setInterval(() => {
      // console.log(this.state.timeCurrent, this.state.timeEnd);
      if (Number(this.state.timeCurrent) < Number(this.state.timeEnd) && this.state.play) {
        if (Number(increment) < 1) {
          increment = 1;
        }
        if (Number(increment) > 10) {
          increment = 10;
        }
        let time = Number(this.state.timeCurrent) + Number(increment);
        // console.log('increment', increment);
        if (time > this.state.timeEnd) {
          time = this.state.timeEnd;
        }
        time = time.toString();
        this.setState({
          timeCurrent: time
        }, () => this.props.dispatch(changeTime(time)))
      } else {
        clearInterval(this.moveSlider);
        pauseButton[0].style.display = 'none';
        playButton[0].style.display = 'block';
        this.setState({
          play: false
        })
      }
    }, 75)
      
  }

  stopSlider() {
    console.log('stop');
    clearInterval(this.moveSlider);
    let playButton = document.getElementsByClassName('play');
    let pauseButton = document.getElementsByClassName('pause');
    pauseButton[0].style.display = 'none';
    playButton[0].style.display = 'block';
    this.setState({
      play: false
    })
  }

  decreaseSpeed() {
    increment--;
  }

  increaseSpeed() {
    increment++;
  }

  render() {
    // console.log('here', this.props.data.range);
    return (
      <div className='controls-container'> 
        <input 
          className="slider" 
          step="1" 
          type="range" 
          min={this.state.timeStart}
          max={this.state.timeEnd} 
          // min="0"
          // max={this.props.data.range.length - 1}
          value={this.state.timeCurrent} 
          onChange={(e) => this.changeTime(e)}
        />
        <div className="display"></div>
        {/*<div className="display">{this.state.timeCurrent}</div>*/}
        {/*<div className="display">{this.props.updateTime.index}</div>*/}
        <div className="play-controls">
          <img 
            src={speedButton} 
            alt="slow-down-button" 
            className="slow"
            onClick={() => this.decreaseSpeed()}
          />
          <img 
            src={buttonPlay} 
            alt="play-button" 
            className="play"
            onClick={() => this.automateSlider()}
          />
          <img 
            src={buttonPause} 
            alt="pause-button" 
            className="pause"
            onClick={() => this.stopSlider()}
          />
          <img 
            src={speedButton} 
            alt="fast-forward-button" 
            className="fast"
            onClick={() => this.increaseSpeed()}
          />
          {/*<button className="slow" onClick={() => this.decreaseSpeed()}>Slower</button>
          <button className="play" onClick={() => this.automateSlider()}>Play</button>
          <button className="pause" onClick={() => this.stopSlider()}>Pause</button>
          <button className="fast" onClick={() => this.increaseSpeed()}>Faster</button>*/}
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   data: state.data,
//   updateTime: state.updateTime
// })

export default connect()(Controls);

// export default connect(mapStateToProps)(Controls);


