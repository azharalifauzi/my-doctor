import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Header, Message} from '../../components';
import {color, fonts} from '../../utils';

const ListDoctor = ({navigation, route}) => {
  const [doctors, setDoctors] = useState([{}]);

  const {category} = route.params;

  useEffect(() => {
    database()
      .ref('users/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then(res => {
        const data = res.val();
        if (res.val()) {
          const filteredData = Object.keys(data).map(val => data[val]);
          setDoctors(filteredData);
        } else {
          setDoctors([]);
        }
      });
  }, []);

  const handleGoToConsult = doctor => {
    analytics().logEvent('start_consult', {
      doctorId: doctor.uid,
      doctorName: doctor.fullName,
      doctorCategory: doctor.category,
    });
    navigation.navigate('Chatting', {profile: doctor});
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          type="dark"
          title={`pilih ${category}`}
          onPress={() => navigation.goBack()}
        />
        {doctors.length === 0 ? (
          <Text style={styles.unavailable}>Dokter tidak tersedia</Text>
        ) : (
          doctors.map((doctor, i) => (
            <Message
              key={`list-doctor-${doctor.uid}`}
              type="pilih-dokter"
              photo={doctor.photo}
              content={doctor.gender}
              title={doctor.fullName}
              onPress={() => handleGoToConsult(doctor)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ListDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: color.white,
    flex: 1,
  },
  unavailable: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: color.text.primary,
  },
});
