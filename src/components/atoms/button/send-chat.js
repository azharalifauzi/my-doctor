import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconSend} from '../../../assets';
import {color} from '../../../utils';

const SendChat = ({isDisabled, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <IconSend style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SendChat;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 45,
    backgroundColor: color.inputChat.bgButton,
    borderRadius: 10,
  },
  icon: {
    marginLeft: 8,
    marginBottom: 8,
    marginTop: 3,
    marginRight: 3,
  },
});
