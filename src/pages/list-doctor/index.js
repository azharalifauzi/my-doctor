import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Message} from '../../components';
import {color} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';

const ListDoctor = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          type="dark"
          title="Pilih Dokter Anak"
          onPress={() => navigation.goBack()}
        />
        <Message
          onPress={() => navigation.navigate('Chatting')}
          type="pilih-dokter"
          content="Wanita"
        />
        <Message type="pilih-dokter" content="Wanita" />
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
});
