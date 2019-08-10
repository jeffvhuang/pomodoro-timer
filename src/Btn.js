import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import { btnStyles } from '../styles/styles';

Btn.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  colour: PropTypes.string,
  textColour: PropTypes.string
}

export default function Btn({ title, onPress, colour, textColour }) {
  const buttonStyles = {
    backgroundColor: (colour) ? colour : 'gainsboro'
  }

  const textStyles = {
    color: (textColour) ? textColour : 'black',
  }

  return (
    <TouchableHighlight style={[btnStyles.button, buttonStyles]} onPress={onPress}>
      <Text style={[btnStyles.buttonText, textStyles]}>{title}</Text>
    </TouchableHighlight>
  )
}