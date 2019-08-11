import React from 'react';
import { Text, View, Animated, Dimensions, Keyboard, TextInput, UIManager  } from 'react-native';
import {vibrate} from '../utils/vibrate';
import { styles, inputStyles } from '../styles/styles';
import TimeDisplay from './TimeDisplay';
import Btn from './Btn';
import TimeInput from './TimeInput';

const { State: TextInputState } = TextInput;

export default class Timer extends React.Component {
  state = {
    workMinutes: 30,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    isWorking: true,
    isPaused: false,
    timer: null,
    counter: 1800, // 1800secs = 30 mins
    // Used for animating the view upwards so keybaord doesnt cover active input
    shift: new Animated.Value(0)
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
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

  // This function returns another function.
  // The inner function will be what is called when any change occurs in TextInput
  // @param stateProperty: the string will be the property in state that will be updated 
  onTimeChange = stateProperty => value => this.setState({ [stateProperty]: this.getValue(value) })

  // Helper to ensure only number is provided
  getValue = (value) => {
    if (isNaN(value) || !value) return 0
    return parseInt(value)
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }

  render() {
    const mins = Math.floor(this.state.counter / 60);
    const secs = this.state.counter % 60;
    const transformStyle = { transform: [{translateY: this.state.shift}] }

    return (
      <Animated.View style={[styles.container, transformStyle]}>
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
              onChange={this.onTimeChange('workMinutes')}
              value={this.state.workMinutes.toString()} />
            <TimeInput label={'Secs'} 
              onChange={this.onTimeChange('workSeconds')}
              value={this.state.workSeconds.toString()} />
          </View>
          <View style={styles.controlRow}>
            <Text style={inputStyles.label}>Break:</Text>
            <TimeInput label={'Mins'} 
              onChange={this.onTimeChange('breakMinutes')}
              value={this.state.breakMinutes.toString()} />
            <TimeInput label={'Secs'} 
              onChange={this.onTimeChange('breakSeconds')}
              value={this.state.breakSeconds.toString()} />
          </View>
        </View>
      </Animated.View>
    )
  }
}
