import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Button, Gap} from '../../components';
import {ILLogo, ILGetStarted} from '../../assets';
import {color, fonts} from '../../utils';

const GetStarted = ({navigation}) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <ILLogo />
      <Text style={styles.copywriting}>
        Konsultasi dengan dokter jadi lebih mudah & fleksibel
      </Text>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={10} />
        <Button
          type="secondary"
          title="Sign In"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    flex: 1,
  },
  copywriting: {
    fontSize: 28,
    color: color.white,
    fontFamily: fonts.primary[600],
  },
});
