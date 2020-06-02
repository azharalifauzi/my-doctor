import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconChevron, IconPhotoNull} from '../../../assets';
import {color, fonts} from '../../../utils';

const Message = ({
  name,
  content,
  type,
  onPress,
  lastChild,
  title,
  IconComponent,
  photo,
}) => {
  const userPhoto =
    !photo || photo?.length === 0 ? IconPhotoNull : {uri: photo};

  const Icon = ({Source, style}) => {
    if (!Source) {
      return <Text />;
    }
    return <Source style={style} />;
  };

  if (content === 'male') {
    content = 'Pria';
  } else if (content === 'female') {
    content = 'Wanita';
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container(lastChild)}>
      {type === 'profile' ? (
        <Icon style={styles.image} Source={IconComponent} />
      ) : (
        <Image style={styles.image} source={userPhoto} />
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.message}>{content}</Text>
      </View>
      {(type === 'pilih-dokter' || type === 'profile') && <IconChevron />}
    </TouchableOpacity>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: lastChild => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: color.border,
    borderBottomWidth: lastChild ? 0 : 1,
    justifyContent: 'space-between',
  }),
  image: {
    height: 46,
    width: 46,
    marginRight: 12,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
  },
  message: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: color.text.secondary,
  },
  textWrapper: {
    flex: 1,
  },
});
