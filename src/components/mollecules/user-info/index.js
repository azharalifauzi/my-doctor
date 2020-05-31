import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyUser} from '../../../assets';
import {fonts, color} from '../../../utils';

const UserInfo = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={DummyUser} />
      <View>
        <Text style={styles.name}>Shayna Melinda</Text>
        <Text style={styles.profession}>Product Designer</Text>
      </View>
    </View>
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
