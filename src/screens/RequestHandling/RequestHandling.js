import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ToastAndroid, Button, ScrollView, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import { styles } from './styles';



// import {Toast} from 'native-base';


export default class RequestHandling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senderProfileUri: '',
      senderName: '',
      senderID: '',
      senderTokenKey: '',
      receiverProfileUri: '',
      receiverName: '',
      receiverID: '',
      latitudeLive: 32.096245,
      longitudeLive: 72.64564,

    }

    // this.getData();

  }


  /* getData :
Getting/Retriving Signed in user Data into AysncStorge here */

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@SignedInTeacherStorage_Key')
      const Data = jsonValue != null ? JSON.parse(jsonValue) : null

      const jsonValue2 = await AsyncStorage.getItem('@senderNotificationData')
      const senderNotificationData = jsonValue2 != null ? JSON.parse(jsonValue2) : null

      console.log(senderNotificationData);
      console.log(Data);
      this.setState({
        senderProfileUri: senderNotificationData.data.Image,
        senderName: senderNotificationData.data.Name,
        senderID: senderNotificationData.data.SenderID,
        senderTokenKey: senderNotificationData.data.SenderTokenKey,
        receiverName: Data.Name,
        receiverProfileUri: Data.Image,
      })
    } catch (e) {
      console.log("error : " + e)
    }
  }



  handleAcceptRequest = () => {
    const CurrentUserID = auth().currentUser.uid;
    const RandomIDGenerator = Math.random().toString(36).substr(2, 5);



    const Notisenderdata = {
      UID: this.state.senderID,
      Image: this.state.senderProfileUri,
      Name: this.state.senderName,
    }
    firestore()
      .collection('teachers')
      .doc(CurrentUserID)
      .collection('connections')
      .doc(RandomIDGenerator)
      .set(Notisenderdata)

    console.log("Data saved! into Teacher(receiver) firestore")



    const NotirecieverData = {
      UID: CurrentUserID,
      Image: this.state.receiverProfileUri,
      Name: this.state.receiverName
    }

    firestore()
      .collection('users')
      .doc(this.state.senderID)
      .collection('connections')
      .doc(RandomIDGenerator)
      .set(NotirecieverData)

    console.log("Data saved! into Student(sender) firestore");

    /* Sending Notification back to the student 
    that Your request has been accepted! */


    let key = "AAAAvPgO_90:APA91bGQ0YESbEWyBy20AebKbBObRIkK_TFKhqxAbEblfch5alWU3TDq7WXqWF1_vYZYyvuUFwZYqwnkvR_TwccWr0AQaNQmmxPskuuk4ijIioIB9VDS-w84Ul7WlKQX6z8KifkYMBbd"
    let NotificationRecieverToken = "dzYhRfsSSuedHmY-XsaFhZ:APA91bGzLQEHo67IzN3_vr3Cx3eRIeCGu_G_9UIwGYMJNnyiU1tspirhO8niYwRYNxAZ2_hy1h89cCOyFhmfdJimwJMWsEnTBoMU7k1QKw457HdhClT3xIgoeevEp8wXqo0_aiJX3GwN"
    let title = "Connection Request"
    let body = "Your request has been accepted."

    return fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization: 'key=' + key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: NotificationRecieverToken,
        notification: {
          title,
          body,
          sound: 'default',
          android_channel_id: '500',
          show_in_foreground: true
        },

      })
    })
      .then(response => console.log("Notification sent" , response))
      .catch(error => error);
  }


  render() {

    // const { route } = this.props
    // /* 2. Get the param */
    // const { NotificationData } = route.params;

    // this.setState({
    //   senderProfileUri: NotificationData.Image,
    //   senderName: NotificationData.Name,
    //   senderID: NotificationData.SenderID,
    //   senderTokenKey: NotificationData.SenderTokenKey
    // })

    return (
      <View style={{ flex: 1, }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Search Tutor', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}

        />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* <View style={styles.insideScrollContainer}> */}

          <View style={styles.imageViewContainer}>
            <Image
              source={require('../../assets/teacherList/simplepic.jpg')}
              // source={{ uri: this.state.profileUri }}
              style={styles.imageView}
            />
          </View>


          <View style={styles.infoContainer}>


            <View style={styles.SingleInfoView}>
              <Text style={styles.headingText}>Name</Text>
              <Text style={styles.nametxt}>
                {this.state.name}
                Wanda
                                    {/* John Doe */}
                        </Text>
            </View>

            <View style={styles.SingleInfoView}>
              <Text style={styles.headingText}>City</Text>
              <Text style={styles.citytxt}>
                {this.state.city}
                                    California
                                </Text>

            </View>

            <View style={styles.SingleInfoView}>
              <Text style={styles.headingText}>Phone Number</Text>
              <Text style={styles.phonetxt}>
                {/* {this.state.phoneNumber} */}
                                    +92376723447
                                </Text>

            </View>




            <View style={styles.SingleInfoView}>
              <Text style={styles.headingText}>Address</Text>
              <Text style={styles.SummaryAndExperinceText}>
                {/* {this.state.address} */}
                            Baker Street , Sherlock House B-221
                        </Text>

            </View>
          </View>

          <View style={styles.containerMap}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              // showsUserLocation={true}
              region={{
                latitude: this.state.latitudeLive,
                longitude: this.state.longitudeLive,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={{ latitude: this.state.latitudeLive, longitude: this.state.longitudeLive }}
                showsUserLocation={true}></Marker>

            </MapView>
          </View>


          {/* </View> */}





          <View style={styles.btnContainer}>

            <TouchableOpacity style={styles.UserBtn}
              onPress={this.handleAcceptRequest}
            >
              <Text style={styles.btnText}>Accept Connection Request</Text>
            </TouchableOpacity>
          </View>

          {/* </View> */}
        </ScrollView>
      </View>
    )
  }
}




