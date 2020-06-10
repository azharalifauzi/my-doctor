import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconCheck, IconCheckSeen} from '../../../assets';
import {Fire} from '../../../config';
import {color, fonts} from '../../../utils';
import Other from './other';
import database from '@react-native-firebase/database';

const ChatItem = ({
  isOther,
  content,
  date,
  photoOther,
  urlDB,
  chatId,
  itemId,
  userDataId,
  chatData,
  seen,
  onLongPress,
  seenBySelf,
}) => {
  useEffect(() => {
    if (userDataId && !seenBySelf) {
      database()
        .ref(urlDB)
        .child(chatId)
        .child(itemId)
        .child('seenBy')
        .child(userDataId)
        .update({seen: true});
    }
  }, [chatData]);

  if (isOther) {
    return (
      <Other
        onLongPress={onLongPress}
        content={content}
        date={date}
        photoOther={photoOther}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onLongPress={onLongPress}
          style={styles.chatContainer}>
          <Text style={styles.chat}>{content}</Text>
        </TouchableOpacity>
        <View style={styles.seenContainer}>
          <Text style={styles.time}>{date}</Text>
          {seen ? <IconCheckSeen /> : <IconCheck style={styles.icon} />}
        </View>
      </View>
    </>
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
    marginRight: 4,
  },
  avatar: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 8,
    borderRadius: 30 / 2,
  },
  seenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
