import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown, faArrowCircleUp, faPause, faPlay, faRefresh } from '@fortawesome/free-solid-svg-icons'

let watch = 0;
let audio = '';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      breakLength: 300,
      sessionLength: 1500,
      timer: 1500,
      sessionType: 'Session',
      play: false,
      reset: false
    }
    this.resetAll = this.resetAll.bind(this);
    this.breakDecrease = this.breakDecrease.bind(this);
    this.breakIncrease = this.breakIncrease.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.playpause = this.playpause.bind(this);
  }
  resetAll() {
    this.setState({
      breakLength: 300,
      sessionLength: 1500,
      timer: 1500,
      sessionType: 'Session',
      play: false,
      reset: true
    })
    audio = document.getElementById('beep');
      audio.currentTime = 0;
      audio.pause();
      clearTimeout(watch);
  }
  componentDidUpdate(){
    if(this.state.timer < 0 && this.state.sessionType === 'Session') {
      clearTimeout(watch);
      this.setState({
        timer: this.state.breakLength,
        sessionType: 'Break'

      })
      audio = document.getElementById('beep');
      audio.currentTime = 0;
      audio.play();
    }
    if(this.state.timer < 0 && this.state.sessionType === 'Break') {
      clearTimeout(watch);
      this.setState({
        timer: this.state.sessionLength,
        sessionType: 'Session'

      })
      audio = document.getElementById('beep');
      audio.currentTime = 0;
      audio.play();
    }
    if(this.state.play){
      clearTimeout(watch);
    watch = setTimeout(() => {
      this.setState({
        timer: this.state.timer -1,
      })}, 1000
    )
    } 
  }

  breakDecrease() {
    if(this.state.breakLength > 60 && this.state.play === false){
    this.setState({
      breakLength: this.state.breakLength -60
    })
    
  }
  }
  breakIncrease() {
    if(this.state.breakLength /60 < 60 && this.state.play === false) {
      this.setState({
        breakLength: this.state.breakLength + 60
      })
      
    }
  }
  sessionDecrement() {
    if(this.state.sessionLength > 60 && this.state.play === false) {
      this.setState({
        sessionLength: this.state.sessionLength - 60,
        timer: this.state.sessionLength - 60
      })
    }
  }
  sessionIncrement() {
      if(this.state.sessionLength / 60 < 60 && this.state.play === false) {
        this.setState({
          sessionLength: this.state.sessionLength + 60,
          timer: this.state.sessionLength + 60
        })
        
      }
  }
  playpause() {
    clearTimeout(watch);
    if(!this.state.play){
      this.setState({
        play: true
      })
    } else if(this.state.play){
      this.setState({
        play: false
      })

    }
    
    }
    
  render() {
    const minutes = Math.floor(this.state.timer/60);
    const seconds = this.state.timer - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return (
      <div className='container-fluid'>
        <h1>25 + 5 Clock</h1>
        <div className='clock'>
        <div id='break-label'>Break Length</div>
        <div id='session-label'>Session Length</div>
        </div>
        <div className='breakc'>
          <div><span id='break-decrement' onClick={this.breakDecrease}><FontAwesomeIcon icon={faArrowCircleDown}></FontAwesomeIcon></span> <span id='break-length'>{this.state.breakLength / 60}</span> <span id='break-increment' onClick={this.breakIncrease}><FontAwesomeIcon icon={faArrowCircleUp}></FontAwesomeIcon></span></div>
          <div><span id='session-decrement' onClick={this.sessionDecrement}><FontAwesomeIcon icon={faArrowCircleDown}></FontAwesomeIcon></span> <span id='session-length'>{this.state.sessionLength /60}</span> <span id='session-increment' onClick={this.sessionIncrement}><FontAwesomeIcon icon={faArrowCircleUp}></FontAwesomeIcon></span></div>
        </div>
        <div className='time'>
          <div id='timer-label'>{this.state.sessionType}</div>
          <div id='time-left'>{formattedMinutes+ ':' + formattedSeconds}</div>
        </div>
        <div className='button'><span id='start_stop' onClick={() => this.playpause()}>{this.state.play ? <FontAwesomeIcon icon={faPause}>  </FontAwesomeIcon>:<FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> }   </span>    <span id='reset' onClick={() => this.resetAll()}>   <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></span></div>
        <audio id="beep" src='https://cdn.pixabay.com/download/audio/2021/09/08/audio_30fd70d538.mp3?filename=censor-beep-1sec-8112.mp3'></audio>
      </div>
      
    )
  }
}

export default App;
