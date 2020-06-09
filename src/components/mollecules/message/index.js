import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconChevron, IconPhotoNull} from '../../../assets';
import {color, fonts} from '../../../utils';
import {Fire} from '../../../config';

const Message = ({
  name,
  content = '',
  type,
  onPress,
  lastChild,
  title,
  IconComponent,
  photo,
  messageId,
  userId,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    if (type !== 'profile' || type !== 'pilih-dokter') {
      if (!isCancelled) {
        Fire.database()
          .ref(`chattings/${messageId}/allChat`)
          .on('value', snapshot => {
            const data = snapshot.val();

            if (data) {
              let counts = 0;
              Object.keys(data).map(key => {
                const dataChat = [];
                Object.keys(data[key]).map(val => {
                  dataChat.push({
                    data: data[key][val],
                    id: val,
                  });
                });
                let counting = 0;
                for (let i = 0; i < dataChat.length; i++) {
                  if (!dataChat[i].data.seenBy[userId].seen) {
                    counting++;
                  }
                }
                counts += counting;
              });
              setCount(counts);
            }
          });
      }
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const userPhoto =
    !photo || photo?.length === 0 ? IconPhotoNull : {uri: photo};

  const Icon = ({Source, style}) => {
    if (!Source) {
      return <Text />;
    }
    return <Source style={style} />;
  };

  if (content === 'male' && type === 'pilih-dokter') {
    content = 'Pria';
  } else if (content === 'female' && type === 'pilih-dokter') {
    content = 'Wanita';
  }

  if (content.length > 31) {
    content = content.slice(0, 30) + '...';
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container(lastChild)}>
      {type === 'profile' ? (
        <Icon style={styles.image} Source={IconComponent} />
      ) : (
        <Image style={styles.image} source={userPhoto} />
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.message}>{content}</Text>
      </View>
      {count > 0 && (
        <View>
          <View style={styles.unReadContainer}>
            <Text style={styles.unRead}>{count > 99 ? '99+' : count}</Text>
          </View>
        </View>
      )}
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
    borderRadius: 46 / 2,
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
  unReadContainer: {
    backgroundColor: color.primary,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unRead: {
    color: color.white,
    fontFamily: fonts.primary[400],
    fontSize: 12,
  },
});
