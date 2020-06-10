import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  IconHelpCenter,
  IconLanguage,
  IconRateUs,
  IconSignOut,
  IconUserProfileActive,
} from '../../assets';
import {Gap, Header, Message, UserAvatar} from '../../components';
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
    auth()
      .signOut()
      .then(res => {
        AsyncStorage.removeItem('user');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        console.log(err.message);
        AsyncStorage.removeItem('user');
        navigation.replace('GetStarted');
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header
            type="profile"
            title="Profile"
            onPress={() => navigation.goBack()}
          />
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
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
