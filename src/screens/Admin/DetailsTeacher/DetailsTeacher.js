//Class code Template
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
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

class DetailsTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            Livelatitude: 123.223,
            liveLongitude: 123.5655,

        }
    }

    goToShowFeedback = async (item) => {
        this.storeData(item)
        this.props.navigation.navigate('FeedbackTeacher')

    }

    goToVerification = async (item) => {
        this.storeTeacherIDforVerifcation(item)
        this.props.navigation.navigate('Verification')

    }


    storeTeacherIDforVerifcation = async (value) => {
        try {
            await AsyncStorage.setItem('@Teacher_UID_Verification', value)
        } catch (e) {
            console.log("error is :" + e)
        }
    }





    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@Teacher_UID_Feedback', value)
        } catch (e) {
            console.log("error is :" + e)
        }
    }



    render() {
        const { route } = this.props
        /* 2. Get the param */
        const { UserName } = route.params;
        const latitudeLive = UserName.Latitude;
        const longitudeLive = UserName.Longitude;
        //console.log(Sub);
        // console.log("fieldsData :", UserName)
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

                    <TouchableOpacity style={styles.UserBtnReviews}
                        onPress={() => this.goToShowFeedback(UserName.key)}>
                        <Text style={styles.btnText}>See Reviews</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.UserBtnFeedback}
                    onPress={() => this.goToVerification(UserName.key)}
                    >
                        <Text style={styles.btnText}>Verification Details</Text>
                    </TouchableOpacity>
                </View>





                {/* </View> */}
            </ScrollView>
        );
    }
}

export default DetailsTeacher;
