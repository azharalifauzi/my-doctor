import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, color} from '../../../utils';

const DoctorDesc = ({label, desc, lastChild}) => {
  return (
    <View style={styles.container(lastChild)}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.desc}>{!desc ? '-' : desc}</Text>
    </View>
  );
};

export default DoctorDesc;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.primary[400],
    color: color.text.secondary,
    marginBottom: 6,
  },
  desc: {
    fontFamily: fonts.primary[400],
    color: color.text.primary,
  },
  container: lastChild => ({
    borderBottomWidth: lastChild ? 0 : 1,
    borderBottomColor: color.border,
    padding: 16,
  }),
});
