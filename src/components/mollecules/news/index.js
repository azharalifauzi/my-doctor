import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DummyGoodNews} from '../../../assets';
import {fonts, color} from '../../../utils';

const News = ({i, source = DummyGoodNews, title}) => {
  return (
    <View style={styles.container(i)}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.date}>Today</Text>
      </View>
      <Image style={styles.image} source={source} />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
    marginBottom: 4,
  },
  container: i => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: color.border,
    padding: 16,
    paddingTop: 0,
    borderBottomWidth: i !== 2 ? 1 : 0,
  }),
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  image: {
    height: 60,
    width: 80,
  },
  date: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: color.text.secondary,
  },
});
