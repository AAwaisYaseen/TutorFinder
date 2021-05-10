//import PushNotification from "react-native-push-notification";
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
// import notifee from '@notifee/react-native';
import { AndroidColor } from '@notifee/react-native';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { Header } from 'react-native-elements';




class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  onDisplayNotification = async () => {
    
    let key = "AAAAvPgO_90:APA91bGQ0YESbEWyBy20AebKbBObRIkK_TFKhqxAbEblfch5alWU3TDq7WXqWF1_vYZYyvuUFwZYqwnkvR_TwccWr0AQaNQmmxPskuuk4ijIioIB9VDS-w84Ul7WlKQX6z8KifkYMBbd"
    let token = "e382ptZ8QpyTY5p7GiuFax:APA91bEIKLHZ9H-3e6WzeJUDfOHqhbg__BJ2gV0In1x9W6Zcnf_rfQ3cSzV44E690Up0n61m2xc34slechC33Z-SlFvL5QrWkpSloOnigtvdTVBCE977cXQW-gJFOXYu6vuKT3DBXV48"
    // let token2 = '4xU8FY3IIYeFCCCFNz0Vymywj6M2'
    let title = "Hello"
    let body = "Joe sent you a request"

    return fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization: 'key=' + key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title,
          body,
          sound: 'default',
          android_channel_id: '500',
          show_in_foreground: true
        },

      })
    })
      .then(response => console.log(response))
      .catch(error => error);
  };

  // Signout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'));
  // }




  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Notifications Dummy', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}

        />
        <Button title="Display Notification" onPress={this.onDisplayNotification} />
      </View>
    );
  }
}


export default Notifications;


















    // onDisplayNotification = () => {
    //   PushNotification.configure({
    //     // (optional) Called when Token is generated (iOS and Android)
    //     onRegister: function (token) {
    //       console.log("TOKEN:", token);
    //     },

    //     // (required) Called when a remote is received or opened, or local notification is opened
    //     onNotification: function (notification) {
    //       console.log("NOTIFICATION:", notification);

    //       // process the notification

    //       // (required) Called when a remote is received or opened, or local notification is opened
    //     },

    //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    //     onAction: function (notification) {
    //       console.log("ACTION:", notification.action);
    //       console.log("NOTIFICATION:", notification);

    //       // process the action
    //     },

    //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //     onRegistrationError: function(err) {
    //       console.error(err.message, err);
    //     },

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





    // onDisplayNotification = async() => {
    //     // Create a channel
    //     const channelId = await notifee.createChannel({
    //       id: 'default',
    //       name: 'Default Channel',
    //     });

    //     // Display a notification
    //     await notifee.displayNotification({
    //       title: 'Notification',
    //       body: 'Joe sent you a request',
    //       android: {
    //         channelId,
    //         smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    //       },
    //     });
    //   }