import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, UserAvatar, Message, Gap} from '../../components';
import {color, getUserData} from '../../utils';
import {
  IconEditProfile,
  IconLanguage,
  IconRateUs,
  IconHelpCenter,
} from '../../assets';

const UserProfile = ({navigation}) => {
  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
  };
  const [userData, setUserData] = useState(initialUserData);

  getUserData(setUserData, initialUserData);

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <UserAvatar
        name={userData.fullName}
        profession={userData.profession}
        photo={userData.photo}
      />
      <Gap height={14} />
      <Message
        onPress={() => navigation.navigate('EditProfile')}
        IconComponent={IconEditProfile}
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
        lastChild
      />
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
