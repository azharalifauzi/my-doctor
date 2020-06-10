import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {checkNotifications} from 'react-native-permissions';
import {
  DummyGoodNewsCitrus,
  DummyGoodNewsOrange,
  IconAhliGizi,
  IconDokterAnak,
  IconDokterUmum,
  IconPsikolog,
} from '../../assets';
import {
  DoctorCategories,
  Gap,
  News,
  TopRatedDoctor,
  UserInfo,
} from '../../components';
import {messaging} from '../../config';
import {color, fonts, getData, getUserData} from '../../utils';

const Doctor = ({navigation}) => {
  const initialUserData = {
    fullName: '',
    profession: '',
    uid: '',
    email: '',
    photo: '',
    role: 'user',
  };
  const [userData, setUserData] = useState(initialUserData);
  const [ratedDoctors, setRatedDoctors] = useState([1, 2, 3]);
  const [opacity_0, setOpacity_0] = useState(true);

  getUserData(setUserData, initialUserData, user => {
    checkNotifications().then(({status, settings}) => {
      if (status === 'granted') {
        messaging.getToken().then(currentToken => {
          if (currentToken && user) {
            database()
              .ref(`devices/${user.uid}`)
              .set({
                fcmToken: currentToken,
                userId: user.uid,
                lastAccess: new Date().getTime(),
              });
          }
        });
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    setOpacity_0(false);
    analytics().setUserProperties({
      userId: userData.uid,
      userName: userData.fullName,
      userProfession: userData.profession,
      userEmail: userData.email,
    });
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('user').then(res => {
        setUserData(res);
      });
    });
  }, [navigation]);

  useEffect(() => {
    database()
      .ref('users/')
      .orderByChild('rate')
      .equalTo(5)
      .limitToLast(4)
      .once('value')
      .then(res => {
        const data = res.val();
        if (data) {
          const filteredData = Object.keys(data).map(val => data[val]);
          setRatedDoctors(filteredData);
        }
      });
  }, []);

  return (
    <View style={styles.container(opacity_0)}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={14} />
          <View style={styles.wrapper}>
            <UserInfo
              name={userData.fullName}
              profession={userData.profession}
              photo={userData.photo}
              onPress={() => navigation.navigate('User Profile')}
            />
          </View>
          {userData.role === 'user' && (
            <>
              <View style={styles.wrapperSpecial}>
                <Text style={styles.konsultasi}>
                  Mau konsultasi dengan siapa hari ini?
                </Text>
              </View>
              <View style={styles.categories}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Gap width={16} />
                  <DoctorCategories
                    onPress={() =>
                      navigation.navigate('ListDoctor', {
                        category: 'dokter umum',
                      })
                    }
                    category="dokter umum"
                    Icon={IconDokterUmum}
                  />
                  <DoctorCategories
                    onPress={() =>
                      navigation.navigate('ListDoctor', {category: 'psikolog'})
                    }
                    category="psikolog"
                    Icon={IconPsikolog}
                  />
                  <DoctorCategories
                    onPress={() =>
                      navigation.navigate('ListDoctor', {category: 'ahli gizi'})
                    }
                    category="ahli gizi"
                    Icon={IconAhliGizi}
                  />
                  <DoctorCategories
                    onPress={() =>
                      navigation.navigate('ListDoctor', {
                        category: 'user care',
                      })
                    }
                    category="user care"
                    Icon={IconDokterAnak}
                  />
                </ScrollView>
              </View>
              <Gap height={14} />
              <View style={styles.wrapper}>
                <Text style={styles.text}>Top Rated Doctors</Text>
                <Gap height={16} />
                <View>
                  {ratedDoctors.map((doctor, i) => (
                    <View key={`top-rated-doctor-${i}`}>
                      <TopRatedDoctor
                        name={doctor.fullName}
                        category={doctor.category}
                        Photo={doctor.photo}
                        onPress={() =>
                          navigation.navigate('DoctorProfile', {
                            profile: doctor,
                          })
                        }
                      />
                      {i !== ratedDoctors.length - 1 ? (
                        <Gap height={16} />
                      ) : null}
                    </View>
                  ))}
                </View>
                <View />
                <Gap height={14} />
              </View>
            </>
          )}
          <View style={styles.wrapperSpecial}>
            <Text style={styles.text}>Good News</Text>
          </View>
          <View>
            <View>
              <News title="Is it safe to stay at home during coronavirus?" />
              <Gap height={16} />
              <News
                title="Consume yellow citrus
                helps you healthier"
                source={DummyGoodNewsCitrus}
              />
              <Gap height={16} />
              <News
                title="Learn how to make a
                proper orange juice at home"
                source={DummyGoodNewsOrange}
                i={2}
              />
            </View>
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
  container: opacity_0 => ({
    backgroundColor: color.secondary,
    flex: 1,
    opacity: opacity_0 ? 0 : 1,
  }),
  content: {
    backgroundColor: color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    flex: 1,
  },
  wrapper: {
    padding: 16,
  },
  wrapperSpecial: {
    padding: 16,
    paddingTop: 0,
  },
});
