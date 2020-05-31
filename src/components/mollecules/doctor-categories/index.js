import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IconDokterUmum} from '../../../assets';
import {color, fonts} from '../../../utils';

const DoctorCategories = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <IconDokterUmum style={styles.icon} />
      <Text style={styles.need}>Saya butuh</Text>
      <Text style={styles.category}>dokter umum</Text>
    </TouchableOpacity>
  );
};

export default DoctorCategories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.categoryLight,
    alignSelf: 'flex-start',
    width: 100,
    height: 130,
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
  },
  icon: {
    marginBottom: 28,
  },
  need: {
    fontFamily: fonts.primary[300],
    fontSize: 12,
    color: color.text.primary,
  },
  category: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: color.text.primary,
  },
});
