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
    FlatList,
    TouchableOpacity,
    LogBox,
} from 'react-native';
import { Card, } from 'react-native-elements'
import { styles } from './styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FeedbackTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            usersList: [],
        }
    }


    componentDidMount = async () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        // this.getData()
        // console.log('ahjbcnabcekcbahc akjbcn ')
        this.getFeedbackDatafromDB()
    }


    getFeedbackDatafromDB = async () => {
        const value = await AsyncStorage.getItem('@Teacher_UID_Feedback')
        console.log("runnashbc");
        // const TeacherUID = this.state.UID
        const subscriber = firestore()
            .collection('teachers')
            .doc(value)
            .collection("feedback")
            .get()
            .then(querySnapshot => {
                const users = []
                //console.log('Total users: ', querySnapshot.size);

                // Getting each feedback data from DB and Storing data into
                // variable.
                querySnapshot.forEach(documentSnapshot => {
                    //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                // console.log(" user listing = ", users)
                this.setState({
                    usersList: users
                })

                console.log("Global Variable = ", this.state.usersList)

                // this.storeData(this.state.usersList);
                // this.props.navigation.navigate('TeacherListing')
            });

        return () => subscriber();
    }


    render() {
        if (this.state.usersList.length === 0)
            return (
                <View style={{ flex: 1 , }}>
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noFeedbackText}>You haven't gotten any feedback yet.</Text>
                    </View>
                </View>
            );

        return (
            <View>
                <SafeAreaView>
                    <ScrollView
                        style={{
                            // backgroundColor: 'yellow' 
                        }}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <FlatList
                            style={{ marginTop: 20 }}
                            data={this.state.usersList}
                            keyExtractor={item => item.key}
                            renderItem={({ item }) => (

                                <View style={styles.customViewFB}>

                                    <View style={styles.TopView}>
                                        <Image
                                            source = {require('../../../assets/user.png')}
                                            style={styles.picStyle}
                                        />

                                        <View style={styles.nameRatingView}>
                                            <Text style={styles.Nametxt}>{item.Name}</Text>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Rating
                                                    // ratingBackgroundColor = 'white'
                                                    imageSize={22}
                                                    readonly
                                                    startingValue={item.Rating}
                                                    style={styles.rating} />


                                                <Text style={styles.ratingTxt}>{item.Rating}/5</Text>
                                            </View>

                                            <View style={styles.feedbackView}>
                                                <Text style={styles.feedbackTxt}>"{item.Feedback}"</Text>

                                            </View>

                                        </View>


                                    </View>
                                </View>
                            )}
                        />

                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

export default FeedbackTeacher;