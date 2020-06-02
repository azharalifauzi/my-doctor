import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {color, fonts} from '../../../utils';

const InputChat = ({onChange, onFocus, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={color.inputChat.placeholder}
        placeholder="Tulis Pesan"
        style={styles.input}
        onChangeText={onChange}
        onFocus={onFocus}
        value={value}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  input: {
    backgroundColor: color.inputChat.background,
    borderRadius: 10,
    padding: 14,
    fontFamily: fonts.primary[400],
    marginRight: 10,
    color: color.text.primary,
  },
  container: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
  },
});
