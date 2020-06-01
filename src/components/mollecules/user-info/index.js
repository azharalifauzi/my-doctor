import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {DummyUser} from '../../../assets';
import {fonts, color} from '../../../utils';

const UserInfo = ({onPress, name, profession, photo}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.photo} source={{uri: photo}} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession}>{profession}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    height: 46,
    width: 46,
    marginRight: 12,
    borderRadius: 46 / 2,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: color.text.primary,
  },
  profession: {
    fontFamily: fonts.primary[400],
    color: color.text.secondary,
    fontSize: 12,
  },
});
