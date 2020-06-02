import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconPhotoNull} from '../../../assets';
import {color, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';

const ChattingHeader = ({onPress, name, profession, photo}) => {
  const userPhoto =
    !photo || photo?.length === 0 ? IconPhotoNull : {uri: photo};

  return (
    <View style={styles.header}>
      <Button icon="back-light" type="icon-only" onPress={onPress} />
      <Gap width={24} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.specialist}>{profession}</Text>
      </View>
      <Image style={styles.image} source={userPhoto} />
    </View>
  );
};

export default ChattingHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 32,
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: color.secondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 107,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: color.white,
    fontFamily: fonts.primary[600],
  },
  specialist: {
    textAlign: 'center',
    color: color.text.secondary,
    fontFamily: fonts.primary[400],
  },
  textWrapper: {
    flex: 1,
  },
  image: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
});
