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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';

class ProfileStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            profileUri: '',
            city: '',
            address: '',

        }
    }

    componentDidMount = async () => {

        this.getData();

    }


    /* getData :
    Getting/Retriving Signed in user Data from AysncStorge here */

    getData = async () => {
        try {
            const Image = await AsyncStorage.getItem('@student_Image_Key')
            const Name = await AsyncStorage.getItem('@student_Name_Key')
            const Email = await AsyncStorage.getItem('@student_Email_Key')
            const Password = await AsyncStorage.getItem('@student_Password_Key')
            const City = await AsyncStorage.getItem('@student_City_Key')
            const Phone = await AsyncStorage.getItem('@student_Phone_Key')
            const Address = await AsyncStorage.getItem('@student_Address_Key')


            this.setState({
                profileUri: Image,
                name: Name,
                email: Email,
                password: Password,
                city: City,
                phoneNumber: Phone,
                address: Address,
            })
            // value previously stored
            console.log("Data recovered from async")
        } catch (e) {
            console.log("error :", e)
        }
    }

    render() {

        return (
            <View style={{ flex: 1, }}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Search Tutor', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {/* <View style={styles.insideScrollContainer}> */}

                    <View style={styles.imageViewContainer}>
                        <Image
                            // source={require('../../assets/teacherList/simplepic.jpg')}
                            source={{ uri: this.state.profileUri }}
                            style={styles.imageView}
                        />
                    </View>


                    <View style={styles.infoContainer}>


                        <View style={styles.SingleInfoView}>
                            <Text style={styles.headingText}>Name</Text>
                            <Text style={styles.nametxt}>
                                {this.state.name}
                            </Text>
                        </View>

                        <View style={styles.SingleInfoView}>
                            <Text style={styles.headingText}>email</Text>
                            <Text style={styles.nametxt}>
                                {this.state.email}
                            </Text>
                        </View>


                        <View style={styles.SingleInfoView}>
                            <Text style={styles.headingText}>City</Text>
                            <Text style={styles.citytxt}>
                                {this.state.city}
                            </Text>

                        </View>

                        <View style={styles.SingleInfoView}>
                            <Text style={styles.headingText}>Phone Number</Text>
                            <Text style={styles.phonetxt}>
                                {this.state.phoneNumber}
                            </Text>

                        </View>




                        <View style={styles.SingleInfoView}>
                            <Text style={styles.headingText}>Address</Text>
                            <Text style={styles.SummaryAndExperinceText}>
                                {this.state.address}
                            </Text>

                        </View>
                    </View>


                    {/* </View> */}





                    <View style={styles.btnContainer}>

                        <TouchableOpacity style={styles.UserBtn}
                        //   onPress={this.handleAcceptRequest}
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

export default ProfileStudent;

