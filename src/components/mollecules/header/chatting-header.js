import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Gap} from '../../atoms';
import {fonts, color} from '../../../utils';
import {DummyDoctor} from '../../../assets';

const ChattingHeader = ({onPress}) => {
  return (
    <View style={styles.header}>
      <Button icon="back-light" type="icon-only" onPress={onPress} />
      <Gap width={24} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Nairobi Putri Hazaya</Text>
        <Text style={styles.specialist}>Dokter Anak</Text>
      </View>
      <Image style={styles.image} source={DummyDoctor} />
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
  },
});
