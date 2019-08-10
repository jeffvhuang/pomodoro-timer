import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import TimeDisplay from './TimeDisplay';
import {vibrate} from '../utils/vibrate';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    textAlign: "center"
  }
});

export default class Timer extends React.Component {
  state = {
    workMinutes: 30,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    isWorking: true,
    timer: null,
    counter: 1800 // 1800secs = 30 mins
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    stopTimer();
  }

  startTimer = () => {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  stopTimer = () => {
    this.clearInterval(this.state.timer);
  }

  setCounter = (mins, secs) => {
    this.setState({ counter: mins*60 + secs });
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

  resetTimer = () => {
    this.stopTimer();
    this.setState(prevState => ({
      counter: prevState.workMinutes*60 + prevState.workSeconds,
      isWorking: true
    }));
  }

  onChanged = (type, text) => {
    const number = parseInt(text);
    switch (type) {
      case 'workMinutes':
        this.setState({ workMinutes: number })
        break;
      case 'workSeconds':
        this.setState({ workSeconds: number })
        break;
      case 'breakMinutes':
        this.setState({ breakMinutes: number })
        break;
      case 'breakSeconds':
        this.setState({ breakSeconds: number })
        break;
    }
  }

  render() {
    const mins = Math.floor(this.state.counter / 60);
    const secs = this.state.counter % 60;

    return (
      <View style={styles.container}>
        <View>
          <Text>Pomodoro Timer</Text>
        </View>
        <TimeDisplay mins={mins} secs={secs} />
        <Button onPress={this.startTimer} title="Start" />
        <Button onPress={this.stopTimer} title="Pause" />
        <Button onPress={this.resetTimer} title="Reset" />
        <TextInput style={styles.input}
          keyboardType='numeric'
          onChangeText={(workMinutes) => this.setState({workMinutes})}
          value={this.state.workMinutes.toString()} />
        <TextInput style={styles.input}
          keyboardType='numeric'
          onChangeText={(workSeconds) => this.setState({workSeconds})}
          value={this.state.workSeconds.toString()} />
        <TextInput style={styles.input}
          keyboardType='numeric'
          onChangeText={(breakMinutes) => this.setState({breakMinutes})}
          value={this.state.breakMinutes.toString()} />
        <TextInput style={styles.input}
          keyboardType='numeric'
          onChangeText={(breakSeconds) => this.setState({breakSeconds})}
          value={this.state.breakSeconds.toString()} />
      </View>
    )
  }
}