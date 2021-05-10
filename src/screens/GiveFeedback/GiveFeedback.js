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
    TextInput,
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import auth, { firebase } from '@react-native-firebase/auth';
import userImageDummy from '../../assets/user.png';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';




class GiveFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            starRating: 0,
            feedback: '',
            SignedInUsedData: '',
            name: '',
            profilePic: userImageDummy,
        }
    }




    /*This function gets called evertime
     when this screen is called. */
    // componentDidMount = async () => {
    //     //     //Calling getData here
    //     //     // console.log("abhcbeh")
    //     this.getData()
    // }




    ratingCompleted = (rating) => {
        console.log("Rating is: " + rating);
        this.setState({
            starRating: rating
        })
    }




    submitRating = () => {
        console.log(this.state.SignedInUsedData)
        console.log("Rating is :" + this.state.starRating);
        console.log("Feebback :" + this.state.feedback);
        // const user = firebase.auth().currentUser;

        // if (user) {
        //     console.log(user.email)
        // }
    }


    saveFeedbackInDatabase = () => {
        const UserData = this.state.SignedInUsedData;
        const TeacherUID = this.state.UID
        const studentUID = firebase.auth().currentUser.uid
        const image = UserData.Image !== undefined ? UserData.Image : this.state.profilePic;
        const name = UserData.Name;
        const feedback = this.state.feedback;
        const rating = this.state.starRating

        // const RandomNumber = Math.floor(Math.random() * 9) + 1;
        const Randrom = Math.random().toString(36).substr(2, 5);
        console.log(UserData, image, name, feedback, rating, studentUID, TeacherUID)
        const feedbackData = {
            StudentUID: studentUID,
            Image: image,
            Name: name,
            Feedback: feedback,
            Rating: rating,
        }
        firestore()
            .collection('teachers')
            .doc(TeacherUID)
            .collection('feedback')
            .doc(Randrom)
            .set(feedbackData)

        console.log("Data saved! into firestore")
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







    /* getData :
    Getting/Retriving Signed in user Data into AysncStorge here */

    // getData = async () => {
    //     try {
    //         const teacherID = await AsyncStorage.getItem('@Teacher_UID')
    //         const jsonValue = await AsyncStorage.getItem('@SignedInUserStorage_Key')
    //         const Data = jsonValue != null ? JSON.parse(jsonValue) : null
    //         // console.log(Data.Name)
    //         console.log("UID is :", teacherID)
    //         console.log(Data);

    //         this.setState({
    //             UID: teacherID,
    //             SignedInUsedData: Data
    //         })
    //         console.log("Data saved")
    //         // console.log("UID : ", this.state.SignedInUsedData)
    //     } catch (e) {
    //         console.log("error : " + e)
    //     }
    // }






    // getDataCheck = () => {
    //     const User = this.state.SignedInUsedData;
    //     console.log(User)
    //     const ID = firebase.auth().currentUser.uid;
    //     console.log(ID)
    //     console.log(User.Name)
    //     console.log(User.Email)
    //     // console.log(User[0])
    //     // console.log("Name :", this.state.SignedInUsedData)
    //     // console.log("UID : ", this.state.SignedInUsedData.Name)

    // }







    render() {
        // const { route } = this.props
        // /* 2. Get the param */
        // const { UID } = route.params;
        // console.log("UID is : ", UID)

        return (
            <View style={styles.container}>



                <View style={styles.insideContainer}>

                    <Text style={styles.txtHeading}>Give Your Feedback</Text>

                    <Rating
                        showRating
                        // fractions
                        // startingValue="{3.3}"
                        onFinishRating={this.ratingCompleted}
                        imageSize={30}
                        style={{ marginTop: 10, paddingVertical: 10, marginBottom: 10 }}
                    />

                    <View style={styles.inputView}>
                        <TextInput
                            autoCorrect
                            placeholder='Feedback'
                            style={styles.inputSummary}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical='top'
                            onChangeText={(text) => this.setState({ feedback: text })}
                        />
                    </View>

                    <TouchableOpacity style={styles.UserBtn}
                    // onPress={this.saveFeedbackInDatabase}
                    >
                        <Text style={styles.btnText}>Submit Feedback</Text>
                    </TouchableOpacity>

                    {/* 
                <Rating
                    style={{ paddingVertical: 10 }}
                    readonly
                    showRating
                    startingValue={this.state.starRating}
                    style={styles.rating} /> */}



                    {/* <Button
                    title="Submit"
                    onPress={this.getDataCheck} /> */}
                    {/* <Rating showRating fractions="{1}" startingValue="{0.0}" /> */}

                </View>
            </View>
        );
    }
}

export default GiveFeedback;