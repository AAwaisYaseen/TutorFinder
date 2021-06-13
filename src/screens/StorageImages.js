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
import auth from '@react-native-firebase/auth';
import { Header } from 'react-native-elements';
import storage from '@react-native-firebase/storage';





class StorageImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImageUrl: '',
      // ImageName: 'profile12ghv56b12t7',
      ImageName: 'profile12ghv56b12t7',
    }
  }

  componentDidMount = () => {


    // const { imageName } = this.state;
    // let imageRef = storage().refFromURL('gs://tutorfinder-867e0.appspot.com/profile12ghv56b12t7');
    let imageRef = storage().ref('/' + this.state.ImageName);

    // const fileRefFromUrl = storage().refFromURL("https://<"+imageName+"> ");

    imageRef
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        this.setState({ profileImageUrl: url });
        console.log("Image succeffult=y retreived")
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Notifications Dummy', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}

        />

        <View style={{ flex: 1 }}>

          <Image
            source={{
              uri: this.state.profileImageUrl,
            }}

            // {uthis.state.profileImageUrl}            // size={25}
            resizeMode='contain'
            style={styles.billPic}
          />

        </View>
      </View>




    );
  }
}


export default StorageImages;

export const styles = StyleSheet.create({
  billPic: {
    backgroundColor: 'yellow',
    width: 200,
    height: 200
  }

})



















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