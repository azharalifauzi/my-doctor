import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DummyDoctor, IconChevron, IconPhotoNull} from '../../../assets';
import {color, fonts} from '../../../utils';

const Message = ({
  name,
  content,
  type,
  onPress,
  lastChild,
  title,
  IconComponent,
}) => {
  const Icon = ({source, style}) => {
    if (!source) {
      return <Text />;
    }
    return <IconComponent style={style} />;
  };

  if (content === 'male') {
    content = 'Pria';
  } else if (content === 'female') {
    content = 'Wanita';
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container(lastChild)}>
      {type === 'profile' ? (
        <Icon style={styles.image} source={IconComponent} />
      ) : (
        <Image style={styles.image} source={IconPhotoNull} />
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
