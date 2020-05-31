import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  UserInfo,
  DoctorCategories,
  Gap,
  TopRatedDoctor,
  News,
} from '../../components';
import {fonts, color} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';

const Doctor = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={14} />
          <View style={styles.wrapper}>
            <UserInfo />
            <Gap height={30} />
            <Text style={styles.konsultasi}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.categories}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Gap width={16} />
              <DoctorCategories
                onPress={() => navigation.navigate('ListDoctor')}
              />
              <DoctorCategories />
              <DoctorCategories />
              <DoctorCategories />
            </ScrollView>
          </View>
          <Gap height={14} />
          <View style={styles.wrapper}>
            <Text style={styles.text}>Top Rated Doctors</Text>
            <Gap height={16} />
            <View>
              {[1, 2, 3].map((doctor, i) => (
                <View key={`top-rated-doctor-${i}`}>
                  <TopRatedDoctor />
                  {i !== 2 ? <Gap height={16} /> : null}
                </View>
              ))}
            </View>
            <View />
            <Gap height={30} />
            <Text style={styles.text}>Good News</Text>
          </View>
          <View>
            {[1, 2, 3].map((doctor, i) => (
              <View key={`good-news-${i}`}>
                <News i={i} />
                {i !== 2 ? <Gap height={16} /> : null}
              </View>
            ))}
          </View>
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  konsultasi: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
    maxWidth: 209,
  },
  categories: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: color.text.primary,
  },
  container: {
    backgroundColor: color.secondary,
  },
  content: {
    backgroundColor: color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  wrapper: {
    padding: 16,
  },
});
