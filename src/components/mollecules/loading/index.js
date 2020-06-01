import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {color, fonts} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <ActivityIndicator color={color.primary} size="large" />
        <Text style={styles.loading}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  loading: {
    marginTop: 10,
    fontFamily: fonts.primary[400],
  },
});
