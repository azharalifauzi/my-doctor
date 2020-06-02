import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Keyboard} from 'react-native';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {Button, ChatItem, Header, InputChat} from '../../components';
import {Fire} from '../../config';
import {color, fonts, getUserData} from '../../utils';

const Chatting = ({navigation, route}) => {
  const {profile, messageId} = route.params;

  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
    photo: '',
  };
  const [userData, setUserData] = useState(initialUserData);
  const [chatContent, setChatContent] = useState('');
  const [chatData, setChatData] = useState([]);
  const [trick, setTrick] = useState(0);

  const chatRef = useRef(null);

  getUserData(setUserData, initialUserData);

  useEffect(() => {
    const urlDB = messageId
      ? `chattings/${messageId}/allChat`
      : `chattings/${userData.uid}_${profile.uid}/allChat`;

    Fire.database()
      .ref(urlDB)
      .on('value', snapshot => {
        const data = snapshot.val();

        if (data) {
          const allDataChat = [];
          Object.keys(data).map(key => {
            const dataChat = [];

            Object.keys(data[key]).map(val => {
              dataChat.push({
                data: data[key][val],
                id: val,
              });
            });

            allDataChat.push({
              id: key,
              data: dataChat,
            });
          });

          setChatData(allDataChat);
        }
      });
  }, [profile.uid, userData.uid]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleFocus);

    return () => {
      Keyboard.addListener('keyboardDidShow', handleFocus).remove();
    };
  });

  const handleScrollBottom = () => {
    chatRef.current.scrollToEnd({animated: false});
    setTrick(1);
  };

  const handleFocus = () => {
    setTimeout(() => {
      chatRef.current.scrollToEnd({animated: true});
    }, 100);
  };

  const handleSend = () => {
    if (chatContent.length > 0) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      const hour = today.getHours();
      const minute = today.getMinutes();

      const data = {
        sendBy: userData.uid,
        chatDate: today.getTime(),
        chatTime: `${hour}:${minute} ${hour > 12 ? 'PM' : 'AM'}`,
        chatContent,
      };
      const chatID = messageId ? messageId : `${userData.uid}_${profile.uid}`;
      const urlChat = `chattings/${chatID}/allChat/${year}-${month}-${date}`;
      const urlForUser = `messages/${userData.uid}/${chatID}`;
      const urlForDoctor = `messages/${profile.uid}/${chatID}`;

      Fire.database()
        .ref(urlChat)
        .push(data)
        .then(res => {
          // Set History for user
          Fire.database()
            .ref(urlForUser)
            .set({
              lastChatContent: chatContent,
              lastChatDate: today.getTime(),
              uidPartner: profile.uid,
            });

          // Set History for doctor
          Fire.database()
            .ref(urlForDoctor)
            .set({
              lastChatContent: chatContent,
              lastChatDate: today.getTime(),
              uidPartner: userData.uid,
            });
        })
        .catch(err => {
          showMessage(err.message);

          setTimeout(() => {
            hideMessage();
          }, 5000);
        });
      setChatContent('');
    }
  };

  return (
    <View style={styles.page}>
      <Header
        name={profile.fullName}
        profession={profile.profession}
        photo={profile.photo}
        onPress={() => navigation.goBack()}
        type="chatting"
      />
      <View style={styles.content(trick)}>
        <ScrollView
          onContentSizeChange={handleScrollBottom}
          ref={chatRef}
          showsVerticalScrollIndicator={false}>
          {chatData?.map(chat => {
            let findDate = chat.id.split('-');
            findDate[1] -= 1;

            const date = new Date(
              Date.UTC(findDate[0], findDate[1], findDate[2]),
            ).toDateString();

            return (
              <View key={chat.id}>
                <Text style={styles.date}>{date.toLocaleString()}</Text>
                {chat.data?.map(val => (
                  <ChatItem
                    key={val.id}
                    content={val.data.chatContent}
                    date={val.data.chatTime}
                    isOther={val.data.sendBy !== userData.uid}
                    photoOther={profile.photo}
                  />
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.send}>
        <InputChat
          value={chatContent}
          onChange={value => setChatContent(value)}
        />
        <Button onPress={handleSend} type="send-chat" />
      </View>
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  content: trick => ({
    flex: 1,
    padding: 16,
    paddingBottom: 4,
    opacity: trick,
  }),
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
