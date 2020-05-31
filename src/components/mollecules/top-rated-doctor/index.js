import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyDoctor, IconStar} from '../../../assets';
import {color, fonts} from '../../../utils';

const TopRatedDoctor = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={DummyDoctor} />
      <View style={styles.identity}>
        <Text style={styles.name}>Alexa Rachel</Text>
        <Text style={styles.category}>Pediatrician</Text>
      </View>
      <View style={styles.stars}>
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
      </View>
    </View>
  );
};

export default TopRatedDoctor;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    marginRight: 12,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: color.text.primary,
  },
  category: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: color.text.secondary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  identity: {
    flex: 1,
  },
});
