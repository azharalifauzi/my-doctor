import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DummyDoctor, IconChevron} from '../../../assets';
import {color, fonts} from '../../../utils';

const Message = ({name, content, type, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={DummyDoctor} />
      <View style={styles.textWrapper}>
        <Text style={styles.name}>Alexander Jannie</Text>
        <Text style={styles.message}>{content}</Text>
      </View>
      {type === 'pilih-dokter' && <IconChevron />}
    </TouchableOpacity>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: color.border,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  image: {
    height: 46,
    width: 46,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
  },
  message: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: color.text.secondary,
  },
  textWrapper: {
    flex: 1,
  },
});
