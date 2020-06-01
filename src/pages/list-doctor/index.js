import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Header, Message} from '../../components';
import {color, fonts} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {Fire} from '../../config';

const ListDoctor = ({navigation, route}) => {
  const [doctors, setDoctors] = useState([{}]);

  const {category} = route.params;

  useEffect(() => {
    Fire.database()
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

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          type="dark"
          title="Pilih Dokter Anak"
          onPress={() => navigation.goBack()}
        />
        {doctors.length === 0 ? (
          <Text style={styles.unavailable}>Dokter tidak tersedia</Text>
        ) : (
          doctors.map(doctor => (
            <Message
              key={doctor.uid}
              type="pilih-dokter"
              content={doctor.gender}
              title={doctor.fullName}
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
