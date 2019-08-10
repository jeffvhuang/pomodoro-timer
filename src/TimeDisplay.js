import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  timeSection: {
    flex: 2,
    justifyContent: 'center'
  },
  time: {
    fontSize: 96
  }
});

TimeDisplay.propTypes = {
  mins: PropTypes.number.isRequired,
  secs: PropTypes.number.isRequired
}

export default function TimeDisplay({ mins, secs }) {
  const minsString = (mins < 10) ? '0' + mins : mins.toString();
  const secString = (secs < 10) ? '0' + secs : secs.toString();
  return (
    <View style={styles.timeSection}>
      <Text style={styles.time}>{minsString}:{secString}</Text>
    </View>
  )
}