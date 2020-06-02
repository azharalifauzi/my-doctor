import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Header,
  UserAvatar,
  Input,
  Button,
  Gap,
  Loading,
} from '../../components';
import {color, getUserData, storeData} from '../../utils';
import ImagePicker from 'react-native-image-picker';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';

const EditProfile = ({navigation}) => {
  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
    photo: '',
  };
  const [userData, setUserData] = useState(initialUserData);
  const [previousPass, setPreviousPass] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  getUserData(setUserData, initialUserData);

  const handleChange = (val, name) => {
    setUserData({
      ...userData,
      [name]: val,
    });
  };

  const handleChangePassword = val => {
    setPassword(val);
  };

  const handleChangePhoto = () => {
    if (!userData.photo) {
      ImagePicker.launchImageLibrary(
        {maxWidth: 300, maxHeight: 300},
        response => {
          if (!response.didCancel) {
            setUserData({
              ...userData,
              photo: `data:${response.type};base64, ${response.data}`,
            });
          }
        },
      );
    }
  };

  const handleRemovePhoto = () => {
    setUserData({...userData, photo: ''});
  };

  const handleSubmit = () => {
    setLoading(true);
    Fire.database()
      .ref(`users/${userData.uid}`)
      .update({
        ...userData,
      })
      .then(async res => {
        if (password.length > 0) {
          const credentials = Fire.auth.EmailAuthProvider.credential(
            userData.email,
            previousPass,
          );

          await Fire.auth().currentUser.reauthenticateWithCredential(
            credentials,
          );

          Fire.auth()
            .currentUser.updatePassword(password)
            .then(res => {
              showMessage({
                message: 'Password Updated',
              });
            })
            .catch(err => {
              showMessage({
                message: err.message,
                color: color.white,
                backgroundColor: color.error,
              });
            });
        }

        setLoading(false);
        storeData('user', userData);
        showMessage({
          message: 'Profile Updated',
        });
      })
      .catch(err => {
        showMessage({
          message: err.message,
          color: color.white,
          backgroundColor: color.error,
        });
        setLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loading />}
      <View style={styles.page}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserAvatar
            onChangePhoto={handleChangePhoto}
            onRemovePhoto={handleRemovePhoto}
            photo={userData.photo}
            type="edit"
          />
          <View style={styles.content}>
            <Input
              onChange={val => handleChange(val, 'fullName')}
              value={userData.fullName}
              label="Full Name"
            />
            <Gap height={24} />
            <Input
              onChange={val => handleChange(val, 'profession')}
              value={userData.profession}
              label="Pekerjaan"
            />
            <Gap height={24} />
            <Input isDisabled value={userData.email} label="Email Address" />
            <Gap height={24} />
            <Input
              onChange={val => setPreviousPass(val)}
              label="Previous Password"
              value={previousPass}
              secureTextEntry
            />
            <Gap height={24} />

            <Input
              onChange={val => handleChangePassword(val)}
              label="Password"
              value={password}
              secureTextEntry
            />
            <Gap height={40} />
            <Button onPress={handleSubmit} title="Save Profile" />
          </View>
        </ScrollView>
      </View>
    </>
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
