import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, InputChat, Button, ChatItem} from '../../components';
import {color, fonts} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';

const Chatting = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} type="chatting" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.date}>Senin, 21 Maret, 2020</Text>
          <ChatItem />
          <ChatItem isOther />
        </ScrollView>
      </View>
      <View style={styles.send}>
        <InputChat />
        <Button type="send-chat" />
      </View>
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 4,
  },
  page: {
    backgroundColor: color.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  send: {
    padding: 16,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontFamily: fonts.primary[400],
    color: color.text.secondary,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
  },
});
