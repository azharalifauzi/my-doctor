import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Message, Gap} from '../../components';
import {fonts, color, getUserData} from '../../utils';
import {Fire} from '../../config';

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

  getUserData(setUserData, initialUserData);

  useEffect(() => {
    if (userData.uid.length > 0) {
      Fire.database()
        .ref(`messages/${userData.uid}/`)
        .on('value', async snapshot => {
          const data = snapshot.val();

          if (data) {
            const newData = [];
            const promises = await Object.keys(data).map(async key => {
              const partnerChat = await Fire.database()
                .ref(`users/${data[key].uidPartner}`)
                .once('value');

              newData.push({
                id: key,
                ...data[key],
                partnerChat: partnerChat.val(),
              });
            });

            await Promise.all(promises);

            setMessages(newData);
          }
        });
    }
  }, [userData.uid]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Gap height={30} />
        <Text style={styles.header}>Messages</Text>
        {messages?.map(message => {
          return (
            <Message
              title={message.partnerChat.fullName}
              key={message.id}
              content={message.lastChatContent}
              photo={message.partnerChat.photo}
              onPress={() =>
                navigation.navigate('Chatting', {
                  messageId: message.id,
                  profile: message.partnerChat,
                })
              }
            />
          );
        })}
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
