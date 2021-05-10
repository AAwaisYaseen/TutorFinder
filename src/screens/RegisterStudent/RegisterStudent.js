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
import firestore from '@react-native-firebase/firestore';
//import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProfileImage from '../../assets/register/profile-pic-dummy.png';


class RegisterStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: ProfileImage,
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            profileUri: '',
            city : '',
            address : '',
            Livelatitude : 123.223,
            liveLongitude : 123.5655,
        }
    }

    componentDidMount = async() => {

        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
            console.log("You can use the ACCESS_FINE_LOCATION")
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    this.setState({
                        Livelatitude : position.coords.latitude,
                        liveLongitude : position.coords.longitude
                    })

                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        else {
            console.log("ACCESS_FINE_LOCATION permission denied")
        }
    }

    SelectImage = () => {

        const options = {
            title: 'Select Avatar',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    profileUri: response.uri
                });
                console.log("Profile Image : " + this.state.avatarSource);
                console.log("profileUri : " + this.state.profileUri);
            }
        })
    }

    // ImagePicker.showImagePicker(options, (response) => {
    //     console.log('Response = ', response);

    //     if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //     } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //         const source = { uri: response.uri };

    //         // You can also display the image using data:
    //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //         this.setState({
    //             profileImage: source,
    //             profileUri : response.uri
    //         });
    //         console.log("Profile Image : "+ this.state.ProfileImage);
    //         console.log("profileUri : " + this.state.profileUri);
    //     }
    // });

    handleRegisterUser = () => {
        const profileUri = this.state.profileUri;
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const phoneNumber = this.state.phoneNumber;
        const city = this.state.city;
        const address = this.state.address;
        const longitude = this.state.liveLongitude;
        const latitude = this.state.Livelatitude;
        // Student Register Code
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                const uid =
                    auth().currentUser !== null ? auth().currentUser.uid : user.uid;
                const doc = firestore()
                    .collection('users')
                    .doc(uid);
                const storeUser = {
                    Image: profileUri,
                    Name: name,
                    Email: email,
                    Password: password,
                    Phone: phoneNumber,
                    City : city,
                    Address : address,
                    Latitude : latitude,
                    Longitude : longitude 
                }
                doc.set(storeUser);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff' }}>
                <View style={styles.profilePicCont}>

                    <TouchableOpacity onPress={this.SelectImage}>
                        <Image
                            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                            source={this.state.avatarSource}
                        // size={25}
                        />
                        <Text style={styles.profilePicText}>Add profile picture</Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.inputCont}>

                    <View style={styles.inputView}>
                        <Text>Name</Text>
                        <TextInput
                            placeholder='Enter your name'
                            style={styles.input}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                    </View>

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

                    <View style={styles.inputView}>
                        <Text>Confirm Password</Text>
                        <TextInput
                            placeholder='Enter your password'
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>Phone Number</Text>
                        <TextInput
                            placeholder='Enter your phone number'
                            style={styles.input}
                            onChangeText={(text) => this.setState({ phoneNumber: text })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>City</Text>
                        <TextInput
                            placeholder='Enter your city'
                            style={styles.input}
                            onChangeText = {(text) => this.setState({city : text})}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>Address</Text>
                        <TextInput
                            placeholder='Enter your address'
                            style={styles.input}
                            onChangeText = {(text) => this.setState({address : text})}
                        />
                    </View>

                </View>


                <View style={styles.SignUpBtnCont}>
                    <TouchableOpacity style={styles.UserBtn}
                        onPress={this.handleRegisterUser}
                    >
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                </View>




            </ScrollView>
        );
    }
}

export default RegisterStudent;