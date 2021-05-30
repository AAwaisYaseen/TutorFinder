import React from 'react'
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import { styles } from './styles';

class StudentHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Grades: ["FSc.1", "FSC.2",
        "CSS", "Intermediate",
        "Nursery",
        "hellcwo", "hellowc",],

      Subjects: ["Physics", "Chemistry", "Urdu",
        "Pak Studies", "Programming",
        "General Studies", "Biology",],

      Livelatitude: 123.223,
      liveLongitude: 123.5655,

      studentID_key: '',
      profileUri: '',
      name: '',
      city: '',
      phoneNumber: '',
      address: '',
      studentLatitudeDB: '',
      studentLongitudeDB: '',
    }
  }

  componentDidMount = async () => {
    /*get Data Function Calling here.*/
    this.getData()
  }


  /* getData Function will give us the data of student which we will pass
  as notification data when sending request to teacher*/
  getData = async () => {
    try {
      const ID = await AsyncStorage.getItem('@student_id_Key')
      const Image = await AsyncStorage.getItem('@student_Image_Key')
      const Name = await AsyncStorage.getItem('@student_Name_Key')
      const City = await AsyncStorage.getItem('@student_City_Key')
      const Phone = await AsyncStorage.getItem('@student_Phone_Key')
      const Address = await AsyncStorage.getItem('@student_Address_Key')

      const jsonValue = await AsyncStorage.getItem('@student_Latitude_Key')
      const Latitude = JSON.parse(jsonValue)

      const jsonValue2 = await AsyncStorage.getItem('@student_Longitude_Key')
      const Longitude = JSON.parse(jsonValue2)


      // const Latitude = await AsyncStorage.getItem('@student_Latitude_Key')
      // const Longitude = await AsyncStorage.getItem('@student_Longitude_Key')


      this.setState({
        studentID_key: ID,
        profileUri: Image,
        name: Name,
        city: City,
        phoneNumber: Phone,
        address: Address,
        studentLatitudeDB: Latitude,
        studentLongitudeDB: Longitude,

      })
      // value previously stored
      console.log("Data recovered from async")
    } catch (e) {
      console.log("error :", e)
    }
  }


  onDisplayNotification = async (token) => {

    let key = "AAAAvPgO_90:APA91bGQ0YESbEWyBy20AebKbBObRIkK_TFKhqxAbEblfch5alWU3TDq7WXqWF1_vYZYyvuUFwZYqwnkvR_TwccWr0AQaNQmmxPskuuk4ijIioIB9VDS-w84Ul7WlKQX6z8KifkYMBbd"
    let NotificationRecieverToken = token
    // let token2 = '4xU8FY3IIYeFCCCFNz0Vymywj6M2'
    let title = "Connection Request"
    let body = "You have a new Connection request"

    const senderToken = await messaging().getToken();

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
        data: {
          "SenderID": this.state.studentID_key,
          "Name": this.state.name,
          "Image": this.state.profileUri,
          "Phone": this.state.phoneNumber,
          "City": this.state.city,
          "Address": this.state.address,
          "Latitude": this.state.studentLatitudeDB,
          "Longitude": this.state.studentLongitudeDB,
          "SenderTokenKey": senderToken
        }
      })
    })
      .then(response => console.log(response))
      .catch(error => error);



    // // Create a channel
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    // });

    // // Display a notification
    // await notifee.displayNotification({
    //   title: 'Notification',
    //   body: 'Joe sent you a connection request',
    //   android: {
    //     channelId,
    //     smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    //   },
    // });
  }


  // goToShowFeedback = (item) => {
  //   this.props.navigation.navigate('ShowFeedback',
  //     {
  //       UID : item
  //     });

  // }


  // goToSubmitFeedback = (item) => {
  //   this.props.navigation.navigate('GiveFeedback',
  //     {
  //       UID : item
  //     });

  // }


  goToShowFeedback = async (item) => {
    this.storeData(item)
    this.props.navigation.navigate('ShowFeedback')

  }

  goToSubmitFeedback = async (item) => {
    this.storeData(item)
    this.props.navigation.navigate('GiveFeedback')

  }



  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@Teacher_UID', value)
    } catch (e) {
      console.log("error is :" + e)
    }
  }

  render() {
    const { route } = this.props
    /* 2. Get the param */
    const { UserName } = route.params;
    const TeacherTokenKey = UserName.TokenKey;
    const Sub = UserName.Subjects;
    //console.log(Sub);
    console.log("fieldsData :", UserName)
    // console.log(UserName.key)
    const latitudeLive = UserName.Latitude;
    const longitudeLive = UserName.Longitude;
    // CallMe = () => {
    //   console.log(Sub)
    // }
    const Subje = ["hel34lo", "hell23o", "hell5o", "helwelo", "helwdclo", "hellcwo", "hellowc",]

    return (
      <ScrollView contentContainerStyle={{ padding: 8, backgroundColor: 'white' }}>
        {/* <View style={styles.container}> */}
        <View style={{
          flexDirection: 'row',
          width: '100%',
          //backgroundColor: 'blue',
          padding: 8,
          marginTop: 20
        }}>

          <View style={{ backgroundColor: 'yellow' }}>
            <Image
              // source={require('../../assets/teacherList/simplepic.jpg')}
              source={{ uri: UserName.Image }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 8,

              }}
            />
          </View>


          <View style={{ width: '70%', paddingLeft: 8 }}>
            <View>
              <Text style={styles.nametxt}>{UserName.Name}</Text>
              <Text style={styles.citytxt}>{UserName.City}</Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={styles.phonetxt}>{UserName.Phone}</Text>
              <Text style={styles.ratetxt}>${UserName.HourlyRate}/hr</Text>
            </View>


          </View>

        </View>

        <View style={{
          //borderBottomWidth: 1,
          //borderTopWidth: 1,
          //borderBottomColor: 'grey',
          padding: 10
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Summary</Text>
          <Text style={{ fontSize: 14 }}>
            {UserName.Summary}
          </Text>
        </View>

        <View style={{
          //borderBottomWidth: 1,
          //borderTopWidth: 1,
          //borderBottomColor: 'grey',
          padding: 10
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Teaching Experince</Text>
          <Text style={{ fontSize: 14 }}>
            {UserName.Experience}
          </Text>
        </View>

        <View style={{ width: '100%', padding: 8, marginBottom: 10, }}>
          <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', }}>
            Grades I Teach :
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
            {UserName.Grades.map((item, key) => (
              <Text key={key} style={{
                //width : 50,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#c85a54',
                alignItems: 'center',
                margin: 3,
                //justifyContent: 'center',
                padding: 8,
              }}>{item}</Text>
            )
            )}

          </View>
        </View>
        <View style={{
          width: '100%', padding: 8,
          //borderTopWidth: 1, borderColor: 'grey',
          marginBottom: 20
        }}>
          <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', }}>
            Subjects I Teach :
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
            {UserName.Subjects.map((item, key) => (
              <Text key={key} style={{
                //width : 50,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#c85a54',
                alignItems: 'center',
                margin: 3,
                //justifyContent: 'center',
                padding: 8,
              }}> {item}</Text>
            )
            )}

          </View>
        </View>

        <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', }}>
          Location :
        </Text>

        <View style={styles.containerMap}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            // showsUserLocation={true}
            region={{
              latitude: latitudeLive,
              longitude: longitudeLive,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              coordinate={{ latitude: latitudeLive, longitude: longitudeLive }}
              showsUserLocation={true}></Marker>

          </MapView>
        </View>

        <View style={styles.btnContainer}>

          <TouchableOpacity style={styles.UserBtn}
            onPress={() => this.onDisplayNotification(UserName.TokenKey)}>
            <Text style={styles.btnText}>Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.UserBtnReviews}
            onPress={() => this.goToShowFeedback(UserName.key)}>
            <Text style={styles.btnText}>See Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.UserBtnFeedback}
            onPress={() => this.goToSubmitFeedback(UserName.key)}>
            <Text style={styles.btnText}>Submit Your Feedback</Text>
          </TouchableOpacity>
        </View>





        {/* </View> */}
      </ScrollView>
    )
  }
}

export default StudentHome;




// const { params } = this.props.navigation.state;

// const data = params ? params.data : null;
//const { UserName} = this.props.route.params;

{/* <Text>{JSON.stringify(data.Name)}</Text> */ }
{/* <Text>ajhdj</Text> */ }
{/* <Text>itemId: {JSON.stringify(itemId)}</Text> */ }
{/* <Text>{this.props.navigation.params.Name}</Text> */ }
{/* <Text>itemId: {JSON.stringify(UserName)}</Text> */ }
{/* <Text>item Name: {UserName.Name}</Text>
        <Text>Item City : {UserName.City} </Text> */}