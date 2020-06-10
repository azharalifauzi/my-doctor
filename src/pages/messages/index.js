import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Gap, Message} from '../../components';
import {color, fonts, getUserData} from '../../utils';

const Messages = ({navigation}) => {
  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
    photo: '',
  };
  const [userData, setUserData] = useState(initialUserData);
  const [messages, setMessages] = useState([]);
  const [opacity, setOpacity] = useState(0);

  getUserData(setUserData, initialUserData);

  useEffect(() => {
    if (userData.uid.length > 0) {
      database()
        .ref(`messages/${userData.uid}/`)
        .orderByChild('lastChatDate')
        .on('value', async snapshot => {
          const data = snapshot.val();

          if (data) {
            let newData = [];
            const promises = await Object.keys(data).map(async key => {
              const partnerChat = await database()
                .ref(`users/${data[key].uidPartner}`)
                .once('value');

              newData.push({
                id: key,
                ...data[key],
                partnerChat: partnerChat.val(),
              });

              const sortedData = newData.sort((a, b) => {
                if (a.lastChatDate < b.lastChatDate) {
                  return 1;
                }
                if (a.lastChatDate > b.lastChatDate) {
                  return -1;
                }
                return 0;
              });

              newData = [...sortedData];
            });

            await Promise.all(promises);

            setMessages(newData);
            setOpacity(1);
          }
        });
    }
  }, [userData.uid]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Gap height={30} />
        <Text style={styles.header}>Messages</Text>
        <View style={styles.opacity(opacity)}>
          {messages.length === 0 && userData.role === 'user' ? (
            <View style={styles.zeroMessagesContainer}>
              <Text style={styles.zeroMessages}>
                You don't have any messages
              </Text>
              <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.startConsult}>
                Start consulting now!
              </Text>
            </View>
          ) : messages.length === 0 && userData.role === 'doctor' ? (
            <View style={styles.zeroMessagesContainer}>
              <Text style={styles.zeroMessages}>
                You don't have any messages
              </Text>
            </View>
          ) : null}
          {messages.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={messages}
              renderItem={({item, index}) => (
                <>
                  <Message
                    title={item.partnerChat.fullName}
                    lastChild={index === messages.length - 1}
                    messageId={item.id}
                    userId={userData.uid}
                    key={item.id}
                    content={item.lastChatContent}
                    photo={item.partnerChat.photo}
                    onPress={() =>
                      navigation.navigate('Chatting', {
                        messageId: item.id,
                        profile: item.partnerChat,
                      })
                    }
                  />
                  {index === messages.length - 1 && <Gap height={70} />}
                </>
              )}
            />
          )}
        </View>
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
  zeroMessages: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: color.text.primary,
    marginTop: -30,
  },
  startConsult: {
    textAlign: 'center',
    marginTop: 6,
    fontFamily: fonts.primary[300],
    color: color.text.secondary,
  },
  zeroMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  opacity: opacity => ({
    opacity: opacity,
    flex: 1,
  }),
});
