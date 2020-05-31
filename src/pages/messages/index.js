import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Message, Gap} from '../../components';
import {fonts, color} from '../../utils';

const Messages = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Gap height={30} />
        <Text style={styles.header}>Messages</Text>
        <Message content="Baik ibu, terima kasih banyak atas wakt..." />
        <Message content="Baik ibu, terima kasih banyak atas wakt..." />
        <Message content="Baik ibu, terima kasih banyak atas wakt..." />
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
    paddingLeft: 16,
  },
  container: {
    backgroundColor: color.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: color.white,
    flex: 1,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
});
