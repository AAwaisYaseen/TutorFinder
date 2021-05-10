import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import PushNotification from "react-native-push-notification";
import { SafeAreaProvider } from 'react-native-safe-area-context';



/* All screens are getting imported here. */

import Splash from './src/screens/Splash/Splash';
import ChooseUser from './src/screens/ChooseUser/ChooseUser';
import TeacherLogin from './src/screens/TeacherLogin/TeacherLogin';
import StudentLogin from './src/screens/StudentLogin/StudentLogin';
import RegisterStudent from './src/screens/RegisterStudent/RegisterStudent';
import RegisterTeacher from './src/screens/RegisterTeacher/RegisterTeacher';
import SearchTutor from './src/screens/SearchTutor/SearchTutor';
import TeacherListing from './src/screens/TeacherListing/TeacherListing';

import StackNavigation from './src/navigation/StackNavigation';
import AuthenticationNavigate from './src/navigation/Authentication/AuthenticationNavigate';
import StudentNavigation from './src/navigation/StudentNavigation';
import { NavigationContainer } from '@react-navigation/native';
import LiveLocationMaps from './src/screens/LiveLocationMaps/LiveLocationMaps';
import PhoneVerification from './src/screens/PhoneVerification/PhoneVerification';
import Notifications from './src/screens/Notifications';
import GiveFeedback from './src/screens/GiveFeedback/GiveFeedback';
import ShowFeedback from './src/screens/ShowFeedback/ShowFeedback';

class App extends React.Component {

  // componentDidMount = () => {
  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function (token) {
  //       console.log("TOKEN:", token);
  //     },

  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     // onNotification: function (notification) {
  //     //   console.log("NOTIFICATION:", notification);

  //     //   // process the notification

  //     //   // (required) Called when a remote is received or opened, or local notification is opened
  //     //   //notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     // },

  //     // // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //     // onAction: function (notification) {
  //     //   console.log("ACTION:", notification.action);
  //     //   console.log("NOTIFICATION:", notification);

  //     //   // process the action
  //     // },

  //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //     onRegistrationError: function (err) {
  //       console.error(err.message, err);
  //     },
  //     sound: 'default',

  //     ReceivedNotification: {
  //       foreground: true,
  //     },

  //     senderID: "811615584221",
  //     // ignoreInForeground : false,
  //     // IOS ONLY (optional): default: all - Permissions to register.
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },

  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,

  //     /**
  //      * (optional) default: true
  //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //      * - if you are not using remote notification or do not have Firebase installed, use this:
  //      *     requestPermissions: Platform.OS === 'ios'
  //      */
  //     requestPermissions: true,
  //   });
  // }


  render() {
    return (

      <SafeAreaProvider>
        <NavigationContainer>
          <AuthenticationNavigate />
        </NavigationContainer>
      </SafeAreaProvider>

      // <SafeAreaProvider>
      //   <NavigationContainer>
      //     <StackNavigation />
      //   </NavigationContainer>
      // </SafeAreaProvider>


      // <SafeAreaProvider>
      //   <GiveFeedback />
      // </SafeAreaProvider>

    );
  }
};

export default App;