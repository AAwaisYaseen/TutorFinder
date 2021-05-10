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
import { Header } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




import { styles } from './styles';

class ProfileTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Grades: ["FSc.1", "FSC.2",
                "CSS", "Intermediate",
                "Nursery",
                "hellcwo", "hellowc",],

            // Grades: [],

            Subjects: ["Physics", "Chemistry", "Urdu",
                "Pak Studies", "Programming",
                "General Studies", "Biology",],

            Livelatitude: 123.223,
            liveLongitude: 123.5655,
            userSignedInData : '',
        }
        this.getData()
        // this.getProfileDatafromFirebase();
    }


    /* getData :
 Getting/Retriving Signed in user Data into AysncStorge here */

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@SignedInTeacherStorage_Key')
            const Data = jsonValue != null ? JSON.parse(jsonValue) : null
            console.log(Data);
            console.log("After get data is calledaksgcjhab ")
            console.log(Data.Name)
            this.setState({
                userSignedInData: Data
            })

            console.log("userSignedInData :", this.state.userSignedInData)
        } catch (e) {
            console.log("error : " + e)
        }
    }


    getProfileDatafromFirebase = () => {
        const UID = auth().currentUser.uid;
        const subscriber = firestore()
            .collection('teachers')
            .doc(UID)
            .onSnapshot(documentSnapshot => {
                console.log("documentSnapshot", documentSnapshot.data())
                const users = documentSnapshot.data()
                const Grades = documentSnapshot.data().Grades

                console.log("user listing local = ", users)
                console.log("Name : ", users.Name)
                console.log("Grades " , Grades)

                this.setState({
                    userSignedInData : users
                })
                console.log("userSignIN :" , this.state.userSignedInData);

                /*Calling Store Data here to
                save data into Async Storage*/
                // this.storeData(users)
                console.log("everything set");
                // this.props.navigation.navigate('DrawerStudent')


                // console.log('User data: ', documentSnapshot.data());
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }

    render() {

        // const userSignedInData = this.state.userSignedInData;
        // this.state.Grades = userSignedInData.Grades;
        // this.setState({
        //     Grades : userSignedInData.Grades
        // })

        Grades = ["FSc.1", "FSC.2",
        "CSS", "Intermediate",
        "Nursery",
        "hellcwo", "hellowc",]
                // const Subjects = userSignedInData.Subjects;

        // const latitudeLive = userSignedInData.Latitude;
        // console.log(latitudeLive);
        // const longitudeLive = userSignedInData.Longitude;
        // console.log(longitudeLive);


        // console.log(Grades)

        return (
            <View style={{ flex: 1, }}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Search Tutor', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.insideScrollContainer}>

                        <View style={styles.imageViewContainer}>
                            <Image
                                source={require('../../assets/teacherList/simplepic.jpg')}
                                source={{ uri: this.state.userSignedInData.Image }}
                                style={styles.imageView}
                            />
                        </View>


                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.nametxt}>
                                    {this.state.userSignedInData.Name}
                                </Text>
                                <Text style={styles.citytxt}>
                                    {this.state.userSignedInData.City}
                                </Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.phonetxt}>
                                    {this.state.userSignedInData.Phone}
                                </Text>
                                <Text style={styles.ratetxt}>
                                    ${this.state.userSignedInData.HourlyRate}/hr
                                </Text>
                            </View>


                        </View>

                    </View>

                    <View style={styles.SummaryAndExperinceView}>
                        <Text style={styles.SummaryAndExperinceTitle}>Summary</Text>
                        <Text style={styles.SummaryAndExperinceText}>
                            {this.state.userSignedInData.Summary}
                        </Text>
                    </View>

                    <View style={styles.SummaryAndExperinceView}>
                        <Text style={styles.SummaryAndExperinceTitle}>Teaching Experince</Text>
                        <Text style={styles.SummaryAndExperinceText}>
                            {this.state.userSignedInData.Experience}
                        </Text>
                    </View>

                    <View style={styles.gradesAndSubjectContainer}>
                        <Text style={styles.gradesAndSubjectTitle}>
                            Grades I Teach :
                    </Text>
                        <View style={styles.gradesAndSubjectListContainer}>
                            {this.state.Grades.map((item, key) => (
                                <Text key={key} style={styles.gradesAndSubjectListView}>
                                    {item}
                                </Text>
                            )
                            )}

                        </View>
                    </View>
                    <View style={styles.gradesAndSubjectContainer}>
                        <Text style={styles.gradesAndSubjectTitle}>
                            Subjects I Teach :
                        </Text>
                        <View style={styles.gradesAndSubjectListContainer}>
                            {this.state.Subjects.map((item, key) => (
                                <Text key={key} style={styles.gradesAndSubjectListView}>
                                    {item}</Text>
                            )
                            )}

                        </View>
                    </View>
                    {/* 
                    <Text style={styles.locationTitle}>
                        Location :
                </Text>

                    <View style={styles.containerMap}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        // showsUserLocation={true}
                        region={{
                            latitude: userSignedInData.Latitude,
                            longitude: userSignedInData.Longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: userSignedInData.Latitude, longitude: userSignedInData.Longitude }}
                            showsUserLocation={true}></Marker>

                    </MapView>
                </View> */}

                    <View style={styles.btnContainer}>

                        <TouchableOpacity style={styles.UserBtn}
                        //onPress={this.onDisplayNotification}
                        >
                            <Text style={styles.btnText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                    {/* </View> */}
                </ScrollView>
            </View>
        )
    }
}

export default ProfileTeacher;

