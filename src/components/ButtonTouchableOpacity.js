import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.buttonContainer, props.style])}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: 'powderblue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
