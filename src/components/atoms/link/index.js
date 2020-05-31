import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color, fonts} from '../../../utils';

const Link = ({size, align, title, onPress}) => {
  return (
    <View>
      <Text onPress={onPress} style={styles.title(size, align)}>
        {title}
      </Text>
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
  title: (size, align) => ({
    fontSize: size,
    textDecorationLine: 'underline',
    color: color.text.secondary,
    fontFamily: fonts.primary[400],
    textAlign: align,
  }),
});
