import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, UserAvatar, Input, Button, Gap} from '../../components';
import {color, getUserData} from '../../utils';

const EditProfile = ({navigation}) => {
  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
    photo: '',
  };
  const [userData, setUserData] = useState(initialUserData);

  getUserData(setUserData, initialUserData);

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserAvatar photo={userData.photo} type="edit" />
        <View style={styles.content}>
          <Input value={userData.fullName} label="Full Name" />
          <Gap height={24} />
          <Input value={userData.profession} label="Pekerjaan" />
          <Gap height={24} />
          <Input value={userData.email} label="Email Address" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={40} />
          <Button title="Save Profile" />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  content: {
    padding: 16,
  },
});
