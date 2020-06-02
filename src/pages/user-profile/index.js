import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {
  IconHelpCenter,
  IconLanguage,
  IconRateUs,
  IconSignOut,
  IconUserProfileActive,
} from '../../assets';
import {Gap, Header, Message, UserAvatar} from '../../components';
import {Fire} from '../../config';
import {color, getData, getUserData} from '../../utils';

const UserProfile = ({navigation}) => {
  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
  };
  const [userData, setUserData] = useState(initialUserData);

  getUserData(setUserData, initialUserData);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('user').then(res => {
        setUserData(res);
      });
    });
  }, [navigation]);

  const handleSignOut = () => {
    Fire.auth()
      .signOut()
      .then(res => {
        AsyncStorage.removeItem('user');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          backgroundColor: color.error,
          color: color.white,
          type: 'default',
        });

        setTimeout(() => {
          hideMessage;
        }, [3000]);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Profile" onPress={() => navigation.goBack()} />
        <UserAvatar
          name={userData.fullName}
          profession={userData.profession}
          photo={userData.photo}
        />
        <Gap height={14} />
        <Message
          onPress={() => navigation.navigate('EditProfile')}
          IconComponent={IconUserProfileActive}
          title="Edit Profile"
          content="Last Updated Yesterday"
          type="profile"
        />
        <Message
          IconComponent={IconLanguage}
          title="Language"
          content="Available 12 Regions"
          type="profile"
        />
        <Message
          IconComponent={IconRateUs}
          title="Give Us Rate"
          content="on Google Play Store"
          type="profile"
        />
        <Message
          IconComponent={IconHelpCenter}
          title="Help Center"
          content="Read our guidelines"
          type="profile"
        />
        <Message
          IconComponent={IconSignOut}
          title="Sign Out"
          content="Sign out from session"
          type="profile"
          lastChild
          onPress={handleSignOut}
        />
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
});
