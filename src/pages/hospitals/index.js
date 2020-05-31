import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {DummyHospitalCover} from '../../assets';
import {Gap, Hospital} from '../../components';
import {color, fonts} from '../../utils';

const Hospitals = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.cover} source={DummyHospitalCover}>
        <Gap height={30} />
        <Text style={styles.nearby}>Nearby Hospitlas</Text>
        <Text style={styles.info}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <Gap height={14} />
        <View>
          <Hospital />
          <Hospital />
          <Hospital />
        </View>
        <Gap height={14} />
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  cover: {
    height: 240,
    alignItems: 'center',
  },
  container: {
    backgroundColor: color.secondary,
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: color.white,
    borderRadius: 30,
    marginTop: -30,
  },
  nearby: {
    fontFamily: fonts.primary[600],
    color: color.white,
    fontSize: 20,
    marginBottom: 6,
  },
  info: {
    fontFamily: fonts.primary[300],
    color: color.white,
    marginBottom: 6,
  },
});
