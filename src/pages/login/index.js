import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ILLogo} from '../../assets';
import {Input, Gap, Link, Button, Loading} from '../../components';
import {color, fonts, storeData} from '../../utils';
import {Fire} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (val, name) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  const handleLogin = () => {
    setLoading(true);
    Fire.auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(async res => {
        const user = await Fire.database()
          .ref(`users/${res.user.uid}`)
          .once('value');
        setLoading(false);
        storeData('user', user);
        navigation.replace('MainApp');
      })
      .catch(err => {
        setLoading(false);

        showMessage({
          message: err.message,
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
      {isLoading && <Loading />}
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            onChange={val => handleChange(val, 'email')}
            value={state.email}
            label="Email Address"
          />
          <Gap height={24} />
          <Input
            secureTextEntry
            onChange={val => handleChange(val, 'password')}
            value={state.password}
            label="Password"
          />
          <Gap height={10} />
          <Link title="Forgot My Password" />
          <Gap height={40} />
          <Button onPress={handleLogin} title="Sign In" />
          <Gap height={30} />
          <Link
            onPress={() => navigation.navigate('Register')}
            title="Create New Account"
            size={16}
            align="center"
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: color.white,
  },
  title: {
    fontSize: 20,
    color: color.text.primary,
    fontFamily: fonts.primary[600],
    maxWidth: 153,
    marginVertical: 40,
    lineHeight: 1.2 * 20,
  },
});
