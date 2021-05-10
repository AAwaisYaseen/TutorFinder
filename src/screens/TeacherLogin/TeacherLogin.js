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
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';




class TeacherLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherEmail: '',
            teacherPassword: '',
            errorMessage: '',
            userSignedInData: '',
        }

    }

    saveloginDataAsyncStorage = async () => {
        await AsyncStorage.setItem('@User_Type', 'teacher')

        const UID = auth().currentUser.uid;

        // const token = await messaging().getToken();
        // firestore()
        //     .collection("teachers")
        //     .doc(UID)
        //     .set({
        //         TokenKey : token
        //     })

        //     console.log("Token Key Set");


        const subscriber = firestore()
            .collection('teachers')
            .doc(UID)
            .onSnapshot(documentSnapshot => {
                // console.log("documentSnapshot", documentSnapshot.data())
                const users = documentSnapshot.data()

                console.log("user listing local = ", users)
                console.log("Name : ", users.Name)

                // this.setState({
                //     userSignedInData: users
                // })
                // console.log("userSignIN :" , this.state.userSignedInData);

                /*Calling Store Data here to
                save data into Async Storage*/
                this.storeData(users)
                console.log("everything set");
                // this.props.navigation.navigate('DrawerStudent')
                // console.log('User data: ', documentSnapshot.data());
            });

        this.props.navigation.navigate('DrawerTeacher')

        // Stop listening for updates when no longer required
        return () => subscriber();

    }


    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@SignedInTeacherStorage_Key', jsonValue)
            console.log("Data saved into Async");
        } catch (e) {
            console.log("error : " + e)
        }
    }


    handleTeacherLogin = () => {
        auth()
            .signInWithEmailAndPassword(this.state.teacherEmail, this.state.teacherPassword)
            .then(() => {

                // const userID = auth().currentUser.uid
                // console.log("userId is :" + userID);
                this.saveloginDataAsyncStorage();
                // this.props.navigation.navigate('DrawerTeacher')
            })
            .catch(error => console.error(error));
    }

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
                                onChangeText={(text) => this.setState({ teacherEmail: text })}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <Text>Password</Text>
                            <TextInput
                                placeholder='Enter your password'
                                style={styles.input}
                                onChangeText={(text) => this.setState({ teacherPassword: text })}
                            />
                        </View>
                    </View>


                    <TouchableOpacity style={styles.UserBtn}
                        onPress={this.handleTeacherLogin}>
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
                                TEACHER SIGNUP
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>


            </View>
        );
    }
}

export default TeacherLogin;