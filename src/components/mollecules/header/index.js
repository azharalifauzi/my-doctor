import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';
import ChattingHeader from './chatting-header';

const Header = ({onPress, title, type, name, profession, photo}) => {
  if (type === 'chatting') {
    return (
      <ChattingHeader
        name={name}
        profession={profession}
        photo={photo}
        onPress={onPress}
      />
    );
  }

  return (
    <View style={styles.header(type)}>
      {type !== 'profile' && (
        <Button
          icon={type === 'dark' ? 'back-light' : 'back-dark'}
          type="icon-only"
          onPress={onPress}
        />
      )}

      <Text style={styles.title(type)}>{title}</Text>
      {type !== 'profile' && <Gap width={24} />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: type => ({
    flexDirection: 'row',
    paddingVertical: 32,
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: type === 'dark' ? color.secondary : color.white,
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),
  title: type => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: type === 'dark' ? color.white : color.text.primary,
    fontFamily: fonts.primary[600],
  }),
});
