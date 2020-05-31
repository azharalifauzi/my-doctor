import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {color, fonts} from '../../../utils';
import IconOnly from './icon-only';
import SendChat from './send-chat';

const Button = ({title, type, onPress, icon, isDisabled}) => {
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }

  if (type === 'send-chat') {
    return <SendChat onPress={onPress} isDisabled={isDisabled} />;
  }

  return (
    <TouchableOpacity style={styles.button(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: type => ({
    backgroundColor:
      type === 'secondary'
        ? color.button.secondary.background
        : color.button.primary.background,
    borderRadius: 10,
  }),
  text: type => ({
    color:
      type === 'secondary'
        ? color.button.secondary.text
        : color.button.primary.text,
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    padding: 10,
  }),
});
