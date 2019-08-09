import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import TimeDisplay from './TimeDisplay';
import {vibrate} from '../utils/vibrate';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Timer extends React.Component {
  state = {
    workMinutes: 30,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    isWorking: true
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Pomodoro Timer</Text>
        </View>
        {this.state.isWorking ? <TimeDisplay mins={this.state.workMinutes} secs={this.state.workSeconds} />
          : <TimeDisplay mins={this.state.breakMinutes} secs={this.state.breakSeconds} />}
        <Button onPress={vibrate} title="vibrate" />
      </View>
    )
  }
}