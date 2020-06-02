import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {getData} from '../../utils';

const Splash = ({navigation}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      setUserData(res);
      if (userData.uid) {
        navigation.replace('MainApp');
      } else if (!userData.uid) {
        navigation.replace('GetStarted');
      }
    });
  }, [navigation, userData?.uid]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.text}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#112340',
    marginTop: 15,
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
