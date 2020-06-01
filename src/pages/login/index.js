import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ILLogo} from '../../assets';
import {Input, Gap, Link, Button} from '../../components';
import {color, fonts} from '../../utils';

const Login = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input label="Email Address" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={10} />
        <Link title="Forgot My Password" />
        <Gap height={40} />
        <Button onPress={() => navigation.replace('MainApp')} title="Sign In" />
        <Gap height={30} />
        <Link
          onPress={() => navigation.navigate('Register')}
          title="Create New Account"
          size={16}
          align="center"
        />
      </ScrollView>
    </View>
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
