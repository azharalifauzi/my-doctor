import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

  const ButtonContainer = isDisabled ? View : TouchableOpacity;

  return (
    <ButtonContainer
      style={styles.button(type, isDisabled)}
      onPress={isDisabled ? null : onPress}>
      <Text style={styles.text(type, isDisabled)}>{title}</Text>
    </ButtonContainer>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: (type, isDisabled) => ({
    backgroundColor:
      type === 'secondary'
        ? color.button.secondary.background
        : isDisabled
        ? color.button.disabled.background
        : color.button.primary.background,
    borderRadius: 10,
  }),
  text: (type, isDisabled) => ({
    color:
      type === 'secondary'
        ? color.button.secondary.text
        : isDisabled
        ? color.button.disabled.text
        : color.button.primary.text,
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    padding: 10,
  }),
});
