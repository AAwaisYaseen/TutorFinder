import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ToastAndroid } from 'react-native'
import { Header } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Toast} from 'native-base';
// import Toast from 'react-native-toast-message';



export default class TeacherHome extends React.Component {

  componentDidMount = async() => {

    this.listenForegroundNotification();

    this.whenClickNotification();

    const token = await messaging().getToken();
    console.log(token)

  }

  whenClickNotification = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data.Name,
      );

      this.props.navigation.navigate("RequestHandling");
      // navigation.navigate(remoteMessage.data.type);

      // if (remoteMessage.notification.title == 'New Chat') {
      //   this.props.navigation.navigate('ChatHistory');
      // } else {
      //   this.props.navigation.navigate('Notifications');
      // }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification.title,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"

          // if (remoteMessage.notification.title == 'New Chat') {
          //   this.props.navigation.navigate('ChatHistory');
          // } else {
          //   this.props.navigation.navigate('Notifications');
          // }
        }
      });
  };

  acceptPressed = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@senderNotificationData', jsonValue)

      this.props.navigation.navigate('RequestHandling');
      
    } catch (e) {
      console.log("error : " + e)
    }
  }


  listenForegroundNotification = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      let message = remoteMessage;

      // this.playSound();

      // ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
      // Toast.show({
      //   text1: 'Hello',
      //   text2: 'This is some something 👋'
      // });
      Alert.alert(
        "Notification",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Accept",
            onPress: () => this.acceptPressed(remoteMessage)
            
            // this.props.navigation.navigate('RequestHandling',
            //   {
            //     NotificationData: remoteMessage.data
            //   })
          }
        ]
      );

      // Toast.show({
      //   text: `${message.notification.title}\n${message.notification.body}`,
      //   textStyle: {
      //     color: 'white',
      //   },
      //   onClose: e => {
      //     console.log("Notification Closed")
      //     // if (e == 'user') {
      //     //   if (message.notification.title == 'New Chat') {
      //     //     this.props.navigation.navigate('ChatHistory');
      //     //   } else {
      //     //     this.props.navigation.navigate('Notifications');
      //     //   }
      //     // }
      //   },
      //   buttonText: 'Show',
      //   position: 'top',
      //   duration: 5000,
      //   buttonTextStyle: {color: '#008000'},
      //   // buttonStyle: {backgroundColor: '#5cb85c'},
      //   style: {
      //     // backgroundColor: 'white',
      //     marginHorizontal: 10,
      //   },
      // });
    });
  };

  // playSound = () => {
  //   // Load the sound file 'whoosh.mp3' from the app bundle
  //   // See notes below about preloading sounds within initialization code below.
  //   var whoosh = new Sound(
  //     'iphone_notification_ringtone.mp3',
  //     Sound.MAIN_BUNDLE,
  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }

  //       // loaded successfully
  //       // console.log(
  //       //   'duration in seconds: ' +
  //       //     whoosh.getDuration() +
  //       //     'number of channels: ' +
  //       //     whoosh.getNumberOfChannels(),
  //       // );
  //       // Play the sound with an onEnd callback
  //       whoosh.play(success => {
  //         if (success) {
  //           console.log('successfully finished playing');
  //         } else {
  //           console.log('playback failed due to audio decoding errors');
  //         }
  //       });
  //     },
  //   );
  //   // // Reduce the volume by half
  //   // whoosh.setVolume(0.5);
  //   // // Position the sound to the full right in a stereo field
  //   // whoosh.setPan(1);
  //   // // Loop indefinitely until stop() is called
  //   // whoosh.setNumberOfLoops(-1);
  //   // // Get properties of the player instance
  //   // console.log('volume: ' + whoosh.getVolume());
  //   // console.log('pan: ' + whoosh.getPan());
  //   // console.log('loops: ' + whoosh.getNumberOfLoops());
  //   // // Seek to a specific point in seconds
  //   // whoosh.setCurrentTime(2.5);
  //   // // Get the current playback point in seconds
  //   // whoosh.getCurrentTime(seconds => console.log('at ' + seconds));
  //   // // Pause the sound
  //   // whoosh.pause();
  //   // // Stop the sound and rewind to the beginning
  //   // whoosh.stop(() => {
  //   //   // Note: If you want to play a sound after stopping and rewinding it,
  //   //   // it is important to call play() in a callback.
  //   //   whoosh.play();
  //   // });
  //   // // Release the audio player resource
  //   // whoosh.release();
  // };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Teacher Dashboard', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}

        />
        <View style={styles.container}>
          <Text>
            Dashboard!
          </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})



