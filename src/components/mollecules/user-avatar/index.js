import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  IconRemovePhoto,
  IconPhotoNull,
  IconFemale,
  IconMale,
} from '../../../assets';
import {color, fonts} from '../../../utils';

const UserAvatar = ({type, gender, name, profession, photo}) => {
  const userPhoto = !photo ? IconPhotoNull : {uri: photo};

  const Icon = ({style}) => {
    if (gender === 'male') {
      return <IconMale style={style} />;
    }
    return <IconFemale style={style} />;
  };

  return (
    <View style={styles.identity}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={userPhoto} />
        {type === 'edit' && <IconRemovePhoto style={styles.addPhoto} />}
        {type === 'doctor' && <Icon style={styles.addPhoto} />}
      </View>
      {type !== 'edit' && (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </>
      )}
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
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
    bottom: 4,
    right: 2,
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
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
    alignItems: 'center',
  },
});
