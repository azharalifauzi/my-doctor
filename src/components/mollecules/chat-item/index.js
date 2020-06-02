import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color, fonts} from '../../../utils';
import Other from './other';

const ChatItem = ({isOther, content, date, photoOther}) => {
  if (isOther) {
    return <Other content={content} date={date} photoOther={photoOther} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <Text style={styles.chat}>{content}</Text>
      </View>
      <Text style={styles.time}>{date}</Text>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginBottom: 20,
    flexDirection: 'column',
  },
  chatContainer: {
    backgroundColor: color.categoryLight,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    maxWidth: '80%',
    marginBottom: 8,
  },
  chat: {
    padding: 12,
    fontFamily: fonts.primary[400],
    color: color.text.primary,
  },
  time: {
    fontFamily: fonts.primary[400],
    color: color.text.secondary,
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  avatar: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 8,
    borderRadius: 30 / 2,
  },
});
