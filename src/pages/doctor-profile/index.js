import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, DoctorDesc, Header, UserAvatar} from '../../components';
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
        photo={profile.photo}
      />
      <DoctorDesc label="Alumnus" desc={profile.alumnus} />
      <DoctorDesc label="Tempat Praktik" desc={profile.praktik} />
      <DoctorDesc lastChild label="No.STR" desc="-" />
      <View style={styles.btnWrapper}>
        <Button
          onPress={() => navigation.navigate('Chatting', {profile})}
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
