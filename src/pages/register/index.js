import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Gap, Input, Header, Loading} from '../../components';
import {color, storeData} from '../../utils';
import {Fire} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Register = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    pekerjaan: '',
    email: '',
    password: '',
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleContinue = (email, password) => {
    setLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const data = {
          fullName: state.name,
          profession: state.pekerjaan,
          email: state.email,
          uid: res.user.uid,
          role: 'user',
        };

        database()
          .ref(`/users/${res.user.uid}/`)
          .set(data);
        analytics().logSignUp({method: 'email'});
        storeData('user', data);

        setLoading(false);
        setState({
          name: '',
          pekerjaan: '',
          email: '',
          password: '',
        });
        navigation.navigate('UploadPhoto');
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);

        setLoading(false);
        setState({
          name: '',
          pekerjaan: '',
          email: '',
          password: '',
        });
        showMessage({
          message: errorMessage,
          color: color.white,
          backgroundColor: color.error,
        });
        setTimeout(() => {
          hideMessage();
        }, 5000);
      });
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <View style={styles.page}>
        <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={state.name}
              onChange={e => handleChange(e, 'name')}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={state.pekerjaan}
              onChange={e => handleChange(e, 'pekerjaan')}
            />
            <Gap height={24} />
            <Input
              label="Email Address"
              value={state.email}
              onChange={e => handleChange(e, 'email')}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={state.password}
              onChange={e => handleChange(e, 'password')}
              secureTextEntry
            />
            <Gap height={40} />
            <Button
              onPress={() => handleContinue(state.email, state.password)}
              title="Continue"
            />
            <Gap height={40} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 40,
    backgroundColor: color.white,
    flex: 1,
  },
  page: {
    flex: 1,
  },
});
