import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {color, fonts} from '../../../utils';

const Input = ({label}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: '#e9e9e9',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    color: color.secondary,
    fontSize: 16,
    fontFamily: fonts.primary[400],
  },
  label: {
    fontFamily: fonts.primary[400],
    marginBottom: 6,
    color: color.text.secondary,
    fontSize: 16,
  },
});
