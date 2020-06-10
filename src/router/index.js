import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import {BottomNavigator} from '../components';
import {messaging} from '../config';
import {
  Chatting,
  Doctor,
  DoctorProfile,
  EditProfile,
  GetStarted,
  ListDoctor,
  Login,
  Messages,
  Register,
  Splash,
  UploadPhoto,
  UserProfile,
} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = ({navigation}) => {
  useEffect(() => {
    messaging.onNotificationOpenedApp(remoteMessage => {
      const senderId = remoteMessage.data.senderId;
      const messageId = remoteMessage.data.messageId;
      database()
        .ref(`users/${senderId}`)
        .once('value')
        .then(snapshot => {
          const data = snapshot.val();
          if (data) {
            navigation.navigate('Chatting', {
              profile: data,
              messageId: messageId,
            });
          }
        });
    });
  }, []);

  useEffect(() => {
    const handleAnalytics = () => {
      if (AppState.currentState === 'active') {
        analytics().logAppOpen();
      }
    };

    AppState.addEventListener('change', handleAnalytics);

    return () => {
      AppState.addEventListener('change', handleAnalytics);
    };
  }, []);
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen component={Doctor} name="Home" />
      <Tab.Screen component={Messages} name="Messages" />
      <Tab.Screen component={UserProfile} name="User Profile" />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListDoctor"
        component={ListDoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
