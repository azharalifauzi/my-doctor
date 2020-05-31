import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DummyGoodNews} from '../../../assets';
import {color, fonts} from '../../../utils';

const Hospital = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={DummyGoodNews} />
      <View style={styles.textWrapper}>
        <Text style={styles.name}>Rumah Sakit Citra Bunga Merdeka</Text>
        <Text style={styles.address}>Jln. Surya Sejahtera 20</Text>
      </View>
    </View>
  );
};

export default Hospital;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  image: {
    height: 60,
    width: 80,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
  },
  address: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: color.text.secondary,
  },
  textWrapper: {
    flex: 1,
  },
});
