import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {getData} from '../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    let isCancelled = false;
    const a = async () => {
      try {
        const data = await getData('user');
        if (!isCancelled) {
          setTimeout(() => {
            if (data) {
              navigation.replace('MainApp');
            } else if (!data) {
              navigation.replace('GetStarted');
            }
          }, 1500);
        }
      } catch (e) {
        console.log(e);
      }
    };

    a();

    return () => {
      isCancelled = true;
    };
  }, []);

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
