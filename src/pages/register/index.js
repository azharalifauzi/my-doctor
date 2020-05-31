import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Input, Header} from '../../components';
import {color} from '../../utils';

const Register = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Pekerjaan" />
        <Gap height={24} />
        <Input label="Email Address" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={40} />
        <Button
          onPress={() => navigation.navigate('UploadPhoto')}
          title="Continue"
        />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
    backgroundColor: color.white,
    flex: 1,
  },
  page: {
    flex: 1,
  },
});
