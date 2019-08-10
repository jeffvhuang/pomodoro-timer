import React from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { inputStyles } from '../styles/styles';

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default function TimeInput({ label, onChange, value }) {
  return (
    <View style={inputStyles.inputRow}>
      <View style={inputStyles.labelContainer}>
        <Text style={inputStyles.label}>{label}</Text>
      </View>
      <TextInput style={inputStyles.input}
        keyboardType='numeric'
        onChangeText={onChange}
        value={value} />
    </View>
  )
}