import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {vibrate} from './utils/vibrate';

export default class App extends React.Component {

  render() {
    // vibrate();
    return (
      <View style={styles.container}>
        <Text>Timer</Text>
        <Button onPress={vibrate} title="vibrate" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
