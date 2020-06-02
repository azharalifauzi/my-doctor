import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconPhotoNull, IconStar} from '../../../assets';
import {color, fonts} from '../../../utils';

const TopRatedDoctor = ({onPress, name, category, Photo}) => {
  const img = !Photo || Photo.length === '0' ? IconPhotoNull : {uri: Photo};

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={img} />
      <View style={styles.identity}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.stars}>
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
      </View>
    </TouchableOpacity>
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
    textTransform: 'capitalize',
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
