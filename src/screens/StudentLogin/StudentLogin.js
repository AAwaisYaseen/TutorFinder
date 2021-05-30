import React, { Suspense } from 'react';
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
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicatorBase } from 'react-native';

let subscriber; // listener Variable for firestore!


class StudentLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            userSignedInData: '',

        }
    }





    /* saveloginDataAsyncStorage : 
     get data of the user who just logged in so and storing it in
     Async (Local) storage so we can use this data in the rest of the app.*/

    // saveloginDataAsyncStorage = (userID) => {
    //     const subscriber = firestore()
    //         .collection('users')
    //         .doc(userID)
    //         .onSnapshot(documentSnapshot => {
    //             console.log("documentSnapshot", documentSnapshot.data())
    //             const users = documentSnapshot.data()
    //             // users.push({
    //             //     ...documentSnapshot.data(),
    //             //     key: documentSnapshot.id,
    //             // });
    //             console.log("user listing local = ", users)
    //             console.log("Name : ", users.Name)
    //             // this.setState({
    //             //     userSignedInData: users
    //             // })
    //             // console.log("userSignIN :" , this.state.userSignedInData);


    //             /*Calling Store Data here to
    //             save data into Async Storage*/
    //             this.storeData(users)
    //             console.log("everything set");
    //             this.props.navigation.navigate('DrawerStudent')


    //             // console.log('User data: ', documentSnapshot.data());
    //         });

    //     // Stop listening for updates when no longer required
    //     return () => subscriber();
    // }



    saveloginDataAsyncStorage = async () => {

        /* Saving the type of user here ! */
        await AsyncStorage.setItem('@User_Type', 'student')

        /* Getting ID of current User. */
        const userID = auth().currentUser.uid;

        /* Updating Token Value for notifications.*/
        const token = await messaging().getToken();
        await firestore()
            .collection("users")
            .doc(userID)
            .update({
                TokenKey: token
            })
            .then(() => {
                console.log('Token Key Updated!');
            });

        /* Get Current User Data from firestore Database 
        and store that data into Local Database (AsyncStorage) for further use.*/
        subscriber = firestore()
            .collection('users')
            .doc(userID)
            .onSnapshot(documentSnapshot => {
                // console.log("documentSnapshot", documentSnapshot.data())
                // const users = documentSnapshot.data()

                /* Storing Data into variables.*/
                const getStudentID = documentSnapshot.id;
                const geStudentImage = documentSnapshot.data().Image;
                const getStudentName = documentSnapshot.data().Name;
                const getStudentEmail = documentSnapshot.data().Email;
                const getStudentPassword = documentSnapshot.data().Password;
                const getStudentCity = documentSnapshot.data().City;
                const getStudentPhone = documentSnapshot.data().Phone;
                const getStudentAddress = documentSnapshot.data().Address;
                const getStudentLatitude = documentSnapshot.data().Latitude;
                const getStudentLongitude = documentSnapshot.data().Longitude;


                console.log("Image : ", geStudentImage)
                console.log("Image : ", getStudentName)
                console.log("Image : ", getStudentEmail)
                console.log("Image : ", getStudentPassword)
                console.log("Image : ", getStudentCity)
                console.log("Image : ", getStudentPhone)
                console.log("Image : ", getStudentAddress)


                /*Calling Store Data here to
                save data into Async Storage*/
                this.storeData(
                    getStudentID,
                    geStudentImage,
                    getStudentName,
                    getStudentEmail,
                    getStudentPassword,
                    getStudentCity,
                    getStudentPhone,
                    getStudentAddress,
                    getStudentLatitude,
                    getStudentLongitude
                )

                console.log("everything set");

                /* stopListener :
                 gets Called to stop listener firestore*/
                 this.stopListener(subscriber);


                // console.log('User data: ', documentSnapshot.data());
            });
        // this.props.navigation.navigate('DrawerStudent')
    }

    stopListener = (subscriber) => {
        subscriber();
     };



    /* handleLoginUser :
    This function Logins The user using firebase auth function.
    we provide email and password and it checks if the user exists in the database
    nad then moves to Home/Dashboard screen */

    handleLoginUser = () => {
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.saveloginDataAsyncStorage()
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }



    /* storeData :
    AysncStorage is a local Storage we use to save data.
    Storing current user Data into AysncStorge here */
    storeData = async (id, image, name, email, password, city, phone, address, latitude, longitude) => {
        try {
            await AsyncStorage.setItem('@student_id_Key', id)
            await AsyncStorage.setItem('@student_Image_Key', image)
            await AsyncStorage.setItem('@student_Name_Key', name)
            await AsyncStorage.setItem('@student_Email_Key', email)
            await AsyncStorage.setItem('@student_Password_Key', password)
            await AsyncStorage.setItem('@student_City_Key', city)
            await AsyncStorage.setItem('@student_Phone_Key', phone)
            await AsyncStorage.setItem('@student_Address_Key', address)

            const latitudeJsonValue = JSON.stringify(latitude)
            await AsyncStorage.setItem('@storage_Key', latitudeJsonValue)

            const longitudeJsonValue = JSON.stringify(longitude)
            await AsyncStorage.setItem('@storage_Key', longitudeJsonValue)
            // await AsyncStorage.setItem('@student_Latitude_Key', latitude)
            // await AsyncStorage.setItem('@student_Longitude_Key', longitude)


            console.log("Done data saved")

        } catch (e) {
            console.log("Error in storing Data :" + e)

        }
    }





    // getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@SignedInUserStorage_Key')
    //         if (value !== null) {
    //             // value previously stored
    //             console.log("Value from get Data :"  , value)
    //         }
    //     } catch (e) {
    //         console.log("error :" , e)
    //     } 
    // }





    /* storeData :
    AysncStorage is a local Storage we use to save data.
    Storing Signed in user Data into AysncStorge here */

    // storeData = async () => {
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         await AsyncStorage.setItem('@SignedInUserStorage_Key', jsonValue)
    //         // await AsyncStorage.setItem('@User_Type', 'student')
    //     } catch (e) {
    //         console.log("error : " + e)
    //     }
    // }





    /* getData :
   Getting/Retriving Signed in user Data into AysncStorge here */

    // getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@SignedInUserStorage_Key')
    //         const Data = jsonValue != null ? JSON.parse(jsonValue) : null
    //         console.log(Data);
    //         console.log("After get data is calledaksgcjhab ")
    //         console.log(Data.Name)
    //     } catch (e) {
    //         console.log("error : " + e)
    //     }
    // }






    render() {
        return (
            <View style={styles.ChooseUser}>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                        source={require('../../assets/splash/logo.png')}
                        size={25}
                    />

                    <View style={styles.loginTextCont}>
                        <Text style={styles.WelcomeTxt}>Welcome!</Text>
                        <Text style={styles.chooseUsertxt}>Get the best from our App!</Text>
                    </View>

                </View>


                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <View style={styles.inputCont}>
                        <View style={styles.inputView}>
                            <Text>Email</Text>
                            <TextInput
                                placeholder='Enter your email'
                                style={styles.input}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <Text>Password</Text>
                            <TextInput
                                placeholder='Enter your password'
                                style={styles.input}
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                        </View>
                    </View>


                    <TouchableOpacity style={styles.UserBtn}
                        onPress={this.handleLoginUser}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: 0.7, width: '70%', backgroundColor: 'grey' }}>

                    </View>

                    <View style={styles.registerView}>
                        <Text style={{ marginRight: 5 }}>Don't have an account?</Text>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('PhoneVerification')}>
                            <Text style={{ fontWeight: 'bold' }}>
                                STUDENT SIGNUP
                            </Text>
                        </TouchableOpacity>

                        {/* <Button title = "Click me to get data"
                        onPress = {this.getData}/> */}
                    </View>


                </View>


            </View>
        );
    }
}

export default StudentLogin;














//Code snippet of getting data from firebase and asaving it in local database.!!!

// const userData = documentSnapshot.data();
                // console.log("user listing local = " , userData)

                // this.setState({
                //     userSignedInData: userData
                // })

                // console.log("userSignIN :" , this.state.userSignedInData);