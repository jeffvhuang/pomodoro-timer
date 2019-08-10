import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {vibrate} from '../utils/vibrate';
import { styles, inputStyles } from '../styles/styles';
import TimeDisplay from './TimeDisplay';
import Btn from './Btn';
import TimeInput from './TimeInput';

export default class Timer extends React.Component {
  state = {
    workMinutes: 30,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    isWorking: true,
    isPaused: false,
    timer: null,
    counter: 1800 // 1800secs = 30 mins
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  startTimer = () => {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer, isPaused: false });
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({ isPaused: true });
  }

  setCounter = (mins, secs) => {
    this.setState(prevState => ({ 
      counter: mins*60 + secs,
      isWorking: !prevState.isWorking
    }));
  }

  resetTimer = () => {
    this.stopTimer();
    this.setState(prevState => ({
      counter: prevState.workMinutes*60 + prevState.workSeconds,
      isWorking: true,
      isPaused: true
    }));
  }

  tick = () => {
    // At one second, the next tick goes to break/work time instead of 0
    if (this.state.counter === 1) {
      vibrate();
      const mins = (this.state.isWorking) ? this.state.breakMinutes : this.state.workMinutes;
      const secs = (this.state.isWorking) ? this.state.breakSeconds : this.state.workSeconds;
      this.setCounter(mins, secs);
    } else {
      this.setState(prevState => ({ counter: prevState.counter - 1 }));
    }
  }

  // Return a function based on what string is passed in to set the correct satte property
  getOnChangeFunction = (stateProperty) => {
    switch(stateProperty) {
      case 'workMinutes':
        return (value) => this.setState({workMinutes: value});
      case 'workSeconds':
          return (value) => this.setState({workSeconds: value});
      case 'breakMinutes':
          return (value) => this.setState({breakMinutes: value});
      case 'breakSeconds':
          return (value) => this.setState({breakSeconds: value});
      default:
        return () => {}
    }
  }

  render() {
    const mins = Math.floor(this.state.counter / 60);
    const secs = this.state.counter % 60;

    return (
      <View style={styles.container}>
        <View style={[styles.header, styles.section]}>
          <Text style={styles.headerText}>Pomodoro</Text>
          <Text style={styles.headerText}>Timer</Text>
        </View>
        <TimeDisplay mins={mins} secs={secs} />
        <View style={styles.controlsSection}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
            {this.state.isPaused ? 
              <Btn onPress={this.startTimer} title="Start" colour="dodgerblue" textColour="white" />
            : <Btn onPress={this.stopTimer} title="Pause" />}
            </View>
            <View style={styles.buttonContainer}>
              <Btn onPress={this.resetTimer} title="Reset" colour="red" textColour="white" />
            </View>
          </View>
          <View style={styles.controlRow}>
            <Text style={inputStyles.label}>Work:</Text>
            <TimeInput label={'Mins'} 
              onChange={this.getOnChangeFunction('workMinutes')}
              value={this.state.workMinutes.toString()} />
            <TimeInput label={'Secs'} 
              onChange={this.getOnChangeFunction('workSeconds')}
              value={this.state.workSeconds.toString()} />
          </View>
          <View style={styles.controlRow}>
            <Text style={inputStyles.label}>Break:</Text>
            <TimeInput label={'Mins'} 
              onChange={this.getOnChangeFunction('breakMinutes')}
              value={this.state.breakMinutes.toString()} />
            <TimeInput label={'Secs'} 
              onChange={this.getOnChangeFunction('breakSeconds')}
              value={this.state.breakSeconds.toString()} />
          </View>
        </View>
      </View>
    )
  }
}
