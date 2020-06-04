import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconPhotoNull} from '../../../assets';
import {color, fonts} from '../../../utils';

const Other = ({content, date, photoOther, onLongPress}) => {
  const userPhoto =
    !photoOther || photoOther.length === 0 ? IconPhotoNull : {uri: photoOther};

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={userPhoto} />
      <View>
        <TouchableOpacity
          onLongPress={onLongPress}
          style={styles.chatContainer}>
          <Text style={styles.chat}>{content}</Text>
        </TouchableOpacity>
        <Text style={styles.time}>{date}</Text>
      </View>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: '80%',
  },
  chatContainer: {
    backgroundColor: color.primary,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    maxWidth: '100%',
    marginBottom: 8,
  },
  chat: {
    padding: 12,
    fontFamily: fonts.primary[400],
    color: color.white,
  },
  time: {
    fontFamily: fonts.primary[400],
    color: color.text.secondary,
    fontSize: 11,
  },
  avatar: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 8,
    borderRadius: 30 / 2,
  },
});
