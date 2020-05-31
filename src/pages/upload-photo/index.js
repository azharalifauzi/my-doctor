import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Header, Button, Link, Gap} from '../../components';
import {color, fonts} from '../../utils';
import {IconPhotoNull, IconButtonAdd} from '../../assets';

const UploadPhoto = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.identity}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar} source={IconPhotoNull} />
            <IconButtonAdd style={styles.addPhoto} />
          </View>
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.profession}>Product Designer</Text>
        </View>
        <View>
          <Button title="Upload and Continue" />
          <Gap height={30} />
          <Link title="Skip for this" align="center" size={16} />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    position: 'relative',
    height: 130,
    width: 130,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  avatar: {
    height: 110,
    width: 110,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 24,
    color: color.text.primary,
  },
  profession: {
    fontFamily: fonts.primary[400],
    fontSize: 18,
    color: color.text.secondary,
  },
  identity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
