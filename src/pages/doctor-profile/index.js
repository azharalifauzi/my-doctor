import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, UserAvatar, DoctorDesc, Button} from '../../components';
import {color} from '../../utils';

const DoctorProfile = ({navigation, route}) => {
  const {profile} = route.params;

  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <UserAvatar
        type="doctor"
        name={profile.fullName}
        gender={profile.gender}
      />
      <DoctorDesc label="Alumnus" desc={profile.alumnus} />
      <DoctorDesc label="Tempat Praktik" desc={profile.praktik} />
      <DoctorDesc lastChild label="No.STR" desc="-" />
      <View style={styles.btnWrapper}>
        <Button
          onPress={() => navigation.navigate('Chatting')}
          title="Start Consultation"
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  btnWrapper: {
    padding: 40,
    paddingTop: 23,
  },
});
