import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Header, Button, Link, Gap} from '../../components';
import {color, fonts, getData, storeData} from '../../utils';
import {IconPhotoNull, IconButtonAdd, IconRemovePhoto} from '../../assets';
import {Fire} from '../../config';
import database from '@react-native-firebase/database';

const UploadPhoto = ({navigation}) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(IconPhotoNull);
  const [userData, setUserData] = useState({
    fullName: '',
    profession: '',
    uid: '',
    email: '',
  });
  const [photoBase64, setPhotoBase64] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUserData(res);
    });

    return () => {
      setUserData({
        fullName: '',
        profession: '',
        uid: '',
        email: '',
      });
    };
  }, []);

  const handleChangePhoto = () => {
    if (!hasPhoto) {
      ImagePicker.launchImageLibrary(
        {maxWidth: 300, maxHeight: 300, quality: 0.6},
        response => {
          if (!response.didCancel) {
            setHasPhoto(true);
            setPhoto({uri: response.uri});
            setPhotoBase64(`data:${response.type};base64, ${response.data}`);
          }
        },
      );
    } else {
      setPhoto(IconPhotoNull);
      setHasPhoto(false);
    }
  };

  const handleSubmit = () => {
    database()
      .ref(`/users/${userData.uid}/`)
      .set({
        ...userData,
        photo: photoBase64,
      });

    storeData('user', {
      ...userData,
      photo: photoBase64,
    });

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.identity}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar} source={photo} />
            <TouchableOpacity
              onPress={handleChangePhoto}
              style={styles.addPhoto}>
              {hasPhoto ? <IconRemovePhoto /> : <IconButtonAdd />}
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userData.fullName}</Text>
          <Text style={styles.profession}>{userData.profession}</Text>
        </View>
        <View>
          <Button
            onPress={handleSubmit}
            isDisabled={!hasPhoto}
            title="Upload and Continue"
          />
          <Gap height={30} />

          <Link
            onPress={() => navigation.replace('MainApp')}
            title="Skip for this"
            align="center"
            size={16}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    position: 'relative',
    height: 130,
    width: 130,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 24,
    color: color.text.primary,
  },
  profession: {
    fontFamily: fonts.primary[400],
    fontSize: 18,
    color: color.text.secondary,
  },
  identity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
