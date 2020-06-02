import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {color, fonts} from '../../../utils';

const Input = ({label, value, onChange, secureTextEntry, isDisabled}) => {
  const [colorBorder, setColor] = useState(color.border);

  const handleFocus = () => {
    setColor(color.tertiary);
  };

  const handleBlur = () => {
    setColor(color.border);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {isDisabled && <View style={styles.overlay} />}
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input(colorBorder)}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: color => ({
    borderColor: color,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    color: color.secondary,
    fontSize: 16,
    fontFamily: fonts.primary[400],
  }),
  label: {
    fontFamily: fonts.primary[400],
    marginBottom: 6,
    color: color.text.secondary,
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 100,
    borderRadius: 10,
  },
  container: {
    position: 'relative',
  },
});
