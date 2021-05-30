import { useState, useEffect } from 'react';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button,
    Alert,
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
//import CodeInput from 'react-native-confirmation-code-input';


function PhoneSignIn({ navigation }) {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    const [name, setName] = useState('');

    const [phone, setPhone] = useState('');

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        //StoreValue();
        // ALERT !!!!! Store Value is not being CALLED
        if(phone == ''){
            Alert.alert("Enter your Phone Number");
        } else {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        await AsyncStorage.setItem('PHONE_KEY', phone);
        console.log('Name and Phone Saved');

        setConfirm(confirmation);
        // this.StoreValue();
        }
    }

    async function confirmCode() {
        try {
            console.log("its Working");
            await confirm.confirm(code);

        } catch (error) {
            console.log('Invalid code.');
        }
        navigation.navigate('RegisterStudent');
        //navigateToHome();
    }


    async function StoreValue(){
        try {
            const nameVal = name;
            const phoneVal = phone;

            if (phoneVal == '') {
                
            }
            else {
                await AsyncStorage.setItem('NAME_KEY', nameVal);
                console.log('Name and Phone Saved');
            }

        } catch (e) {
            console.log(e)
        }

    }

    function SignOut() {

        auth()
            .signOut()
            .then(() => console.log('User signed out!'));

    }


    if (!confirm) {
        return (
            <View style={styles.SplashContainer}>

                <View
                    style={styles.headerContainer}>

                </View>

                <View style={styles.PhoneNoContainer}>

                    <Text style={{ color: '#6C648B', fontSize: 16 }}>
                        Enter Your Number
                    </Text>

                    <TextInput
                        placeholder='+92 [3XXXXXXXXX]'
                        placeholderTextColor='grey'
                        style={styles.txtboxPhone}
                        onChangeText={(Text) => setPhone(Text)}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#B1B1B1', fontSize: 16 }}>
                            You will get Code via SMS , Operator rates
                        </Text>

                        <Text style={{ color: '#B1B1B1', fontSize: 16 }}>
                            may apply.
                        </Text>
                    </View>

                </View>

                <TouchableOpacity style={styles.getStrtdBtnContainer}
                    onPress={() => signInWithPhoneNumber(phone)}>
                    <Text style={styles.btnTextContainer}>
                        Send Code
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.SplashContainer}>

            <View
                style={styles.headerContainer}>

            </View>

            <View style={styles.PhoneNoContainer}>
                <Text style={{ color: '#6C648B', fontSize: 20 }}>
                    Enter Code
                    </Text>


                <TextInput
                    style={styles.txtboxCode}
                    value={code}
                    onChangeText={text => setCode(text)}
                />



                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#B1B1B1', fontSize: 16 }}>
                        We have sent a Six digit verification code
                        </Text>

                    <Text style={{ color: '#B1B1B1', fontSize: 16 }}>
                        to your number . Enter the code above
                        </Text>

                    <Text style={{ color: '#B1B1B1', fontSize: 16 }}>
                        to verify your number.
                        </Text>
                </View>


                {/* <Button title='Sign out' onPress={() => SignOut()} /> */}

            </View>

            <TouchableOpacity style={styles.getStrtdBtnContainer}
                onPress={() => confirmCode()}>
                <Text style={styles.btnTextContainer}>
                    Verify Number
                    </Text>
            </TouchableOpacity>
        </View>
    );
}




class PhoneVerification extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <PhoneSignIn navigation = {this.props.navigation}/>
        );
    }


}



export default PhoneVerification;