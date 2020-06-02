import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  UserInfo,
  DoctorCategories,
  Gap,
  TopRatedDoctor,
  News,
} from '../../components';
import {fonts, color, getData, getUserData} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IconDokterUmum,
  IconPsikolog,
  IconAhliGizi,
  IconDokterAnak,
  DummyGoodNewsCitrus,
  DummyGoodNewsOrange,
} from '../../assets';
import {Fire} from '../../config';

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

  getUserData(setUserData, initialUserData, () => {
    setOpacity_0(false);
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('user').then(res => {
        setUserData(res);
      });
    });
  }, [navigation]);

  useEffect(() => {
    Fire.database()
      .ref('users/')
      .orderByChild('rate')
      .limitToLast(3)
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
                        category: 'dokter anak',
                      })
                    }
                    category="dokter anak"
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
                      {i !== 2 ? <Gap height={16} /> : null}
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
