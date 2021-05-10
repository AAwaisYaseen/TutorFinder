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
    TextInput,
    LogBox,
    PermissionsAndroid,
} from 'react-native';
import { styles } from './styles';
import MultiSelect from 'react-native-multiple-select';
import { Subjects } from './DataList/SubjectList';
import { Grades } from './DataList/GradesList';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProfileImage from '../../assets/register/profile-pic-dummy.png';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';




class RegisterTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItemsSubjects: [],
            selectedItemsGrades: [],
            avatarSource: '',
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            city: '',
            address: '',
            hourlyRate: '',
            profileUri: '',
            teachingExperience: '',
            summary: '',
            Livelatitude: 123.223,
            liveLongitude: 123.5655,
        }
    }


    componentDidMount = async () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        this.getData()
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@SignedInTeacherStorage_Key')
            const Data = jsonValue != null ? JSON.parse(jsonValue) : null
            console.log(Data);
            console.log("After get data is calledaksgcjhab ")
            this.setState({
                name: Data.Name,
                email: Data.Email,
                password: Data.Password,
                phoneNumber: Data.Phone,
                city: Data.City,
                address: Data.Address,
                hourlyRate: Data.HourlyRate,
                // avatarSource : Data.Image,
                profileUri: Data.Image,
                selectedItemsGrades: Data.Grades,
                selectedItemsSubjects: Data.Subjects,
                teachingExperience: Data.Experience,
                summary: Data.Summary,
            })
        } catch (e) {
            console.log("error : " + e)
        }
    }

    /*
     Select and Upload Profile image from the library
    */
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

    editProfileData = () => {

        const profileUri = this.state.profileUri;
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const phoneNumber = this.state.phoneNumber;
        const city = this.state.city;
        const address = this.state.address;
        const hourlyRate = this.state.hourlyRate;
        const subjects = this.state.selectedItemsSubjects;
        const grades = this.state.selectedItemsGrades;
        const experience = this.state.teachingExperience;
        const summary = this.state.summary;
        // const longitude = this.state.liveLongitude;
        // const latitude = this.state.Livelatitude;


        const UserID = auth().currentUser.uid;

        firestore()
            .collection('teachers')
            .doc(UserID)
            .update({
                Image: profileUri,
                Name: name,
                Email: email,
                Password: password,
                Phone: phoneNumber,
                City: city,
                Address: address,
                HourlyRate: hourlyRate,
                Subjects: subjects,
                Grades: grades,
                Experience: experience,
                Summary: summary,
            })
            .then(() => {
                console.log('User updated!');
            });
    }

    showData = () => {
        const profileUri = this.state.profileUri;
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const phoneNumber = this.state.phoneNumber;
        const city = this.state.city;
        const address = this.state.address;
        const hourlyRate = this.state.hourlyRate;
        const subjects = this.state.selectedItemsSubjects;
        const gardes = this.state.selectedItemsGrades;
        const experience = this.state.teachingExperience;
        const summary = this.state.summary;
        const longitude = this.state.liveLongitude;
        const latitude = this.state.Livelatitude;

        console.log(profileUri);
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(phoneNumber);
        console.log(city);
        console.log(address);
        console.log(hourlyRate);
        console.log(subjects);
        console.log(gardes);
        console.log(experience);
        console.log(summary);
        console.log(latitude);
        console.log(longitude);

    }



    handleTeacherRegister = () => {

        const profileUri = this.state.profileUri;
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const phoneNumber = this.state.phoneNumber;
        const city = this.state.city;
        const address = this.state.address;
        const hourlyRate = this.state.hourlyRate;
        const subjects = this.state.selectedItemsSubjects;
        const grades = this.state.selectedItemsGrades;
        const experience = this.state.teachingExperience;
        const summary = this.state.summary;
        const longitude = this.state.liveLongitude;
        const latitude = this.state.Livelatitude;

        // Teacher Register Code
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                const uid =
                    auth().currentUser !== null ? auth().currentUser.uid : user.uid;
                const doc = firestore()
                    .collection('teachers')
                    .doc(uid);
                const storeUser = {
                    Image: profileUri,
                    Name: name,
                    Email: email,
                    Password: password,
                    Phone: phoneNumber,
                    City: city,
                    Address: address,
                    HourlyRate: hourlyRate,
                    Subjects: subjects,
                    Grades: grades,
                    Experience: experience,
                    Summary: summary,
                    Latitude: latitude,
                    Longitude: longitude,
                }
                doc.set(storeUser);
                console.log("Teacher Data Saved");
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

        console.log('user data saved');

    }


    onSelectedSubjectsChange = selectedItemsSubjects => {
        this.setState({ selectedItemsSubjects });
    };

    onSelectedGradesChange = selectedItemsGrades => {
        this.setState({ selectedItemsGrades });
    };

    render() {
        //const { selectedItems } = this.state;
        const { selectedItemsSubjects } = this.state;
        const { selectedItemsGrades } = this.state;

        return (
            <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff' }}>

                <View style={styles.profilePicCont}>

                    <TouchableOpacity onPress={this.SelectImage} style={styles.uploadPic}>
                        <Image
                            style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
                            // source={this.state.avatarSource}
                            source={{ uri: this.state.profileUri }}

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
                            value={this.state.name}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>Email</Text>
                        <TextInput
                            placeholder='Enter your email'
                            style={styles.input}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>Password</Text>
                        <TextInput
                            placeholder='Enter your password'
                            style={styles.input}
                            value={this.state.password}
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
                            value={this.state.phoneNumber}
                            onChangeText={(text) => this.setState({ phoneNumber: text })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>City</Text>
                        <TextInput
                            placeholder='Enter your location'
                            style={styles.input}
                            value={this.state.city}
                            onChangeText={(text) => this.setState({ city: text })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>Address</Text>
                        <TextInput
                            placeholder='Enter your address'
                            style={styles.input}
                            value={this.state.address}
                            onChangeText={(text) => this.setState({ address: text })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text>Hourly Rate ($)</Text>
                        <TextInput
                            placeholder='Enter hourly rate'
                            style={styles.input}
                            value={this.state.hourlyRate}
                            onChangeText={(text) => this.setState({ hourlyRate: text })}
                        />
                    </View>


                    <View style={styles.MiddleLineView}>
                        <View style={{ height: 0.7, width: '100%', backgroundColor: 'black' }}>

                        </View>
                    </View>

                    <View style={styles.inputView}>
                        <MultiSelect
                            hideTags
                            items={Subjects}
                            uniqueKey="name"
                            ref={(component) => { this.multiSelect1 = component }}
                            onSelectedItemsChange={this.onSelectedSubjectsChange}
                            selectedItems={selectedItemsSubjects}
                            selectText="Select Subjects"
                            searchInputPlaceholderText="Search Items..."
                            onChangeInput={(text) => console.log(text)}
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC', }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
                        <View>
                            {this.multiSelect1 && this.multiSelect1.getSelectedItemsExt(selectedItemsSubjects)}
                        </View>

                    </View>

                    <View style={styles.inputView}>
                        <MultiSelect
                            hideTags
                            items={Grades}
                            uniqueKey="name"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedGradesChange}
                            selectedItems={selectedItemsGrades}
                            selectText="Select Grades"
                            searchInputPlaceholderText="Search Items..."
                            onChangeInput={(text) => console.log(text)}
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC', }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
                        <View>
                            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItemsGrades)}
                        </View>
                    </View>

                    <View style={styles.inputView}>
                        <Text>Teaching Experience</Text>
                        <TextInput
                            placeholder='Tell us about your teaching experince ...'
                            style={styles.inputTeachingExp}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical='top'
                            value={this.state.teachingExperience}
                            onChangeText={(text) => this.setState({ teachingExperience: text })}
                        />
                    </View>


                    <View style={styles.inputView}>
                        <Text>Summary</Text>
                        <TextInput
                            placeholder='Tell us about yourself'
                            style={styles.inputSummary}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical='top'
                            value={this.state.summary}
                            onChangeText={(text) => this.setState({ summary: text })}
                        />
                    </View>

                </View>


                <View style={styles.SignUpBtnCont}>
                    <TouchableOpacity style={styles.UserBtn}
                        onPress={this.editProfileData}
                    //onPress={this.showData}
                    >
                        <Text style={styles.btnText}>Update Information</Text>
                    </TouchableOpacity>
                </View>




            </ScrollView>
        );
    }
}

export default RegisterTeacher;