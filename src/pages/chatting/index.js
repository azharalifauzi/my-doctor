import Clipboard from '@react-native-community/clipboard';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SectionList,
} from 'react-native';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {
  Button,
  ChatItem,
  DialogBoxChat,
  Gap,
  Header,
  InputChat,
} from '../../components';
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
  const [height, setHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [checkPosition, setCheckPosition] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const [contentToCopy, setContentToCopy] = useState(null);

  const chatRef = useRef(null);

  getUserData(setUserData, initialUserData);

  const messageID = messageId ? messageId : `${userData.uid}_${profile.uid}`;
  const urlDB = `chattings/${messageID}/allChat`;

  useEffect(() => {
    const handleLeave = () => {
      if (AppState.currentState !== 'active') {
        navigation.navigate('Messages');
      }
    };

    AppState.addEventListener('change', handleLeave);

    return () => {
      AppState.removeEventListener('change', handleLeave);
    };
  }, []);

  useEffect(() => {
    Fire.database()
      .ref(urlDB)
      .on('value', snapshot => {
        const data = snapshot.val();

        if (data) {
          const allDataChat = [];
          const sortedAllChatKey = Object.keys(data).sort((a, b) => {
            const findDateA = a.split('-');
            findDateA[1] = findDateA[1] - 1;
            const dateA = new Date(
              findDateA[0],
              findDateA[1],
              findDateA[2],
            ).getTime();

            const findDateB = b.split('-');
            findDateB[1] = findDateB[1] - 1;
            const dateB = new Date(
              findDateA[0],
              findDateA[1],
              findDateA[2],
            ).getTime();

            if (dateA < dateB) {
              return 1;
            }
            if (dateA > dateB) {
              return -1;
            }
            return 0;
          });
          sortedAllChatKey.map(key => {
            const dataChat = [];

            Object.keys(data[key]).map(val => {
              dataChat.unshift({
                data: data[key][val],
                id: val,
              });
            });

            const sortedDataChat = dataChat.sort((a, b) => {
              if (a.data.chatDate > b.data.chatDate) {
                return 1;
              }
              if (a.data.chatDate < b.data.chatDate) {
                return -1;
              }
              return 0;
            });

            allDataChat.unshift({
              id: key,
              data: sortedDataChat,
            });
          });

          setChatData(allDataChat);
        }
      });
  }, [profile.uid, userData.uid, urlDB, messageID]);

  useEffect(() => {
    if (currentPosition + 200 < height - contentHeight) {
      setCheckPosition(true);
    } else {
      setCheckPosition(false);
    }
  }, [currentPosition, height, contentHeight]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', handleFocus);
    return () => {
      Keyboard.addListener('keyboardDidHide', handleFocus).remove();
    };
  }, []);

  const handleScrollBottom = (w, h) => {
    const sectionIdx = chatData.length - 1;
    const itemIdx = chatData[sectionIdx]?.data?.length - 1;
    const itemIndex = itemIdx;
    if (!checkPosition && chatRef !== null && !isNaN(itemIdx)) {
      // chatRef?.current.scrollToEnd({animated: false});
      console.log(sectionIdx, itemIndex);

      setTimeout(() => {
        chatRef.current.scrollToLocation({sectionIndex: sectionIdx, itemIndex});
      }, 300);
    }

    let totalItems = 0;

    for (let i = 0; i < chatData.length; i++) {
      for (let j = 0; j < chatData[i].data.length; j++) {
        totalItems++;
      }
    }

    const timeOut = 60 * totalItems;

    if (chatData.length > 0) {
      setTimeout(
        () => {
          setTrick(1);
          setHeight(h);
        },
        timeOut < 650 ? 650 : timeOut,
      );
    }
  };

  const handleScroll = event => {
    const {y} = event.nativeEvent.contentOffset;
    setCurrentPosition(y);
  };

  const handleFocus = e => {
    Keyboard.dismiss();
  };

  const handleScrollFocus = () => {
    setTimeout(() => {
      if (chatRef !== null && !checkPosition) {
        // chatRef.current.scrollToEnd({animated: true});
        const sectionIdx = chatData.length - 1;
        const itemIndex = chatData[sectionIdx].data.length - 1;

        chatRef.current.scrollToLocation({sectionIndex: sectionIdx, itemIndex});
      }
    }, 300);
  };

  const handleLayout = ({nativeEvent}) => {
    setContentHeight(nativeEvent.layout.height);
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
        seenBy: {
          [userData.uid]: {seen: true},
          [profile.uid]: {seen: false},
        },
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

          // Send Notification
          Fire.database()
            .ref(`devices/${profile.uid}`)
            .once('value')
            .then(snapshot => {
              const value = snapshot.val();
              if (value) {
                let destination = value.fcmToken;
                const body = {
                  data: {
                    senderId: userData.uid,
                    messageId: messageID,
                  },
                  notification: {
                    title: userData.fullName,
                    body: chatContent,
                  },
                  to: destination,
                  priority: 'high',
                  icon: require('../../assets/ic_launcher.png'),
                };

                const headers = new Headers();

                headers.append(
                  'Authorization',
                  'key=AAAAj5jpOkE:APA91bFtoVc_1-x9yD2UqvHNiH1a5pbR4T93Jub3DFBn5jFXNhrYxguawTEdC8RMyLvdxjXUS__tmJBQtEuRAgcgLR7JROtiRZqBHGl1Q_NzHuNmFpA3BD3LIeWEKzfmT9Mc9bprSpAT',
                );
                headers.append('Content-Type', 'application/json');

                // Scroll To Bottom
                if (chatRef !== null) {
                  // chatRef?.current.scrollToEnd({animated: false});
                  const sectionIdx = chatData.length - 1;
                  const itemIndex = chatData[sectionIdx].data.length;

                  chatRef.current.scrollToLocation({
                    sectionIndex: sectionIdx,
                    itemIndex,
                  });
                }

                fetch('https://fcm.googleapis.com/fcm/send', {
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers,
                })
                  .then(response => response.json())
                  .then(val => {
                    Fire.database()
                      .ref(`notifications/${userData.uid}`)
                      .push({
                        senderId: userData.uid,
                        messageId: messageID,
                        body: chatContent,
                        title: userData.fullName,
                        receiverToken: destination,
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
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

  const handleCopy = () => {
    Clipboard.setString(contentToCopy);
    setDialog(false);
  };

  return (
    <>
      {isDialog && (
        <DialogBoxChat onCopy={handleCopy} onClose={() => setDialog(false)} />
      )}
      <View style={styles.page}>
        <Header
          name={profile.fullName}
          profession={profile.profession}
          photo={profile.photo}
          onPress={() => navigation.goBack()}
          type="chatting"
        />
        <View style={styles.content(trick)}>
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={chatData}
            onContentSizeChange={handleScrollBottom}
            ref={chatRef}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                console.log('error to scroll');
              });
            }}
            onScroll={handleScroll}
            onLayout={handleLayout}
            keyExtractor={item => item.id}
            renderSectionHeader={({section: {id}}) => {
              let findDate = id.split('-');
              findDate[1] -= 1;

              const date = new Date(
                Date.UTC(findDate[0], findDate[1], findDate[2]),
              ).toDateString();

              return (
                <>
                  <Gap height={16} />
                  <Text style={styles.date}>{date.toLocaleString()}</Text>
                </>
              );
            }}
            renderItem={({item, section}) => {
              let splittedChatTime = item.data.chatTime.split(':');
              let chatTime = splittedChatTime[1].split(' ');
              chatTime.unshift(splittedChatTime[0]);
              let fixedChatTime = [];
              for (let i = 0; i < 2; i++) {
                if (chatTime[i].length < 2) {
                  let val = '0' + chatTime[i];
                  fixedChatTime.push(val);
                } else {
                  fixedChatTime.push(chatTime[i]);
                }
              }
              fixedChatTime = fixedChatTime.join(':') + ' ' + chatTime[2];

              const id = profile.uid;

              const seen = item?.data.seenBy[id]?.seen;
              const seenBySelf = item?.data.seenBy[userData.uid]?.seen;

              return (
                <ChatItem
                  key={item.id}
                  content={item.data.chatContent}
                  date={fixedChatTime}
                  isOther={item.data.sendBy !== userData.uid}
                  photoOther={profile.photo}
                  urlDB={urlDB}
                  chatId={section.id}
                  itemId={item.id}
                  userDataId={userData.uid}
                  chatData={chatData}
                  seen={seen}
                  seenBySelf={seenBySelf}
                  onLongPress={() => {
                    setDialog(true);
                    setContentToCopy(item.data.chatContent);
                  }}
                />
              );
            }}
          />
          {/* <ScrollView
            onContentSizeChange={handleScrollBottom}
            ref={chatRef}
            onScroll={handleScroll}
            onLayout={handleLayout}
            showsVerticalScrollIndicator={false}>
            <Gap height={16} />
            {chatData?.map(chat => {
              let findDate = chat.id.split('-');
              findDate[1] -= 1;

              const date = new Date(
                Date.UTC(findDate[0], findDate[1], findDate[2]),
              ).toDateString();

              return (
                <View key={chat.id}>
                  <Text style={styles.date}>{date.toLocaleString()}</Text>
                  {chat.data?.map(val => {
                    let splittedChatTime = val.data.chatTime.split(':');
                    let chatTime = splittedChatTime[1].split(' ');
                    chatTime.unshift(splittedChatTime[0]);
                    let fixedChatTime = [];
                    for (let i = 0; i < 2; i++) {
                      if (chatTime[i].length < 2) {
                        let val = '0' + chatTime[i];
                        fixedChatTime.push(val);
                      } else {
                        fixedChatTime.push(chatTime[i]);
                      }
                    }
                    fixedChatTime = fixedChatTime.join(':') + ' ' + chatTime[2];

                    const id = profile.uid;

                    const seen = val?.data.seenBy[id]?.seen;
                    const seenBySelf = val?.data.seenBy[userData.uid]?.seen;

                    return (
                      <ChatItem
                        key={val.id}
                        content={val.data.chatContent}
                        date={fixedChatTime}
                        isOther={val.data.sendBy !== userData.uid}
                        photoOther={profile.photo}
                        urlDB={urlDB}
                        chatId={chat.id}
                        itemId={val.id}
                        userDataId={userData.uid}
                        chatData={chatData}
                        seen={seen}
                        seenBySelf={seenBySelf}
                        onLongPress={() => {
                          setDialog(true);
                          setContentToCopy(val.data.chatContent);
                        }}
                      />
                    );
                  })}
                </View>
              );
            })}
          </ScrollView> */}
        </View>
        <View style={styles.send}>
          <InputChat
            onFocus={handleScrollFocus}
            value={chatContent}
            onChange={value => setChatContent(value)}
          />
          <Button onPress={handleSend} type="send-chat" />
        </View>
      </View>
    </>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  content: trick => ({
    flex: 1,
    paddingHorizontal: 16,
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
