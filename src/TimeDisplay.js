import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TimeDisplay.propTypes = {
  mins: PropTypes.number.isRequired,
  secs: PropTypes.number.isRequired
}

export default function TimeDisplay({ mins, secs }) {
  const minsString = (mins < 10) ? '0' + mins : mins;
  const secString = (secs < 10) ? '0' + secs : secs;
  return (
    <View>
      <Text>{minsString}:{secString}</Text>
    </View>
  )
}