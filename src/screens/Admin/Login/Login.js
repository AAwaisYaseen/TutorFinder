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


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        }
    }




    /* handleLoginUser :
    This function Logins The user using firebase auth function.
    we provide email and password and it checks if the user exists in the database
    nad then moves to Home/Dashboard screen */

    handleLoginUser = async() => {
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                /* Saving the type of user here ! */
                 AsyncStorage.setItem('@User_Type', 'admin')
                this.props.navigation.navigate("DrawerAdmin")
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.ChooseUser}>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                        source={require('../../../assets/splash/logo.png')}
                        size={25}
                    />

                    <View style={styles.loginTextCont}>
                        <Text style={styles.WelcomeTxt}>Welcome! Admin</Text>
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


                </View>


            </View>
        );
    }
}

export default Login;