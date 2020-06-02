import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconRemovePhoto,
  IconPhotoNull,
  IconFemale,
  IconMale,
  IconButtonAdd,
} from '../../../assets';
import {color, fonts} from '../../../utils';

const UserAvatar = ({
  type,
  gender,
  name,
  profession,
  photo,
  onChangePhoto,
  onRemovePhoto,
}) => {
  const userPhoto =
    !photo || photo?.length === 0 ? IconPhotoNull : {uri: photo};

  const Icon = ({style}) => {
    if (gender === 'male') {
      return <IconMale style={style} />;
    }
    return <IconFemale style={style} />;
  };

  const IconEdit = ({style}) => {
    if (!photo || photo?.length < 0) {
      return (
        <TouchableOpacity onPress={onChangePhoto} style={style}>
          <IconButtonAdd />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={onRemovePhoto} style={style}>
        <IconRemovePhoto />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.identity}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={userPhoto} />
        {type === 'edit' && <IconEdit style={styles.addPhoto} />}
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
