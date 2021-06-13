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
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { Header } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';





class VerifyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billPictureUri: '',
            idCardPictureUri: '',
            userName : '',
            billPictureName: '',
            idCardPictureName: ''
        }
    }

    componentDidMount = () => {

        /* Getting the name of user so we can send 
        that as name of images in Storage
        So it's easy for us to find that later. */

        const ID = auth().currentUser.uid;

        firestore()
            .collection('teachers')
            .doc(ID)
            .get()
            .then(documentSnapshot => {

                const USER_NAME = documentSnapshot.data().Name
                this.setState({
                    userName: USER_NAME
                })

                console.log("UserName retreived" , this.state.userName)
            })

    }


    SelectBillImage = () => {

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
                // const source = { uri: response.uri };
                const source = response.uri

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                let imageName = 'bill' + this.state.userName;
                let uploadUri = Platform.OS === 'ios' ? source.replace('file://', '') : source;

                this.setState({
                    billPictureUri : uploadUri,
                    billPictureName : imageName,
                    // profileUri: response.uri
                });
            }
        })

        /* Upload Image to Cloud Storage*/
        // this.uploadImageToCloudStorage();

    }



    SelectIDCardImage = () => {

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
                // const source = { uri: response.uri };
                const source = response.uri

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                let imageName = 'IDCard' + this.state.userName;
                let uploadUri = Platform.OS === 'ios' ? source.replace('file://', '') : source;

                this.setState({
                    idCardPictureUri: uploadUri,
                    idCardPictureName: imageName,
                    // profileUri: response.uri
                });
            }
        })

        /* Upload Image to Cloud Storage*/
        // this.uploadImageToCloudStorage();

    }

    uploadImageToCloudStorage = async () => {
        const { billPictureUri, billPictureName, idCardPictureUri, idCardPictureName } = this.state;

        const USER_ID = auth().currentUser.uid;
        await storage()
            .ref(billPictureName)
            .putFile(billPictureUri)
            .then((snapshot) => {
                //You can check the image is now uploaded in the storage bucket
                console.log(`${billPictureName} has been successfully uploaded.`);
            })
            .catch((e) => console.log('uploading image error => ', e));

        await storage()
            .ref(idCardPictureName)
            .putFile(idCardPictureUri)
            .then((snapshot) => {
                //You can check the image is now uploaded in the storage bucket
                console.log(`${idCardPictureName} has been successfully uploaded.`);
            })
            .catch((e) => console.log('uploading image error => ', e));


        await firestore()
            .collection('teachers')
            .doc(USER_ID)
            .update({
                BillPicture: billPictureName,
                IDCardPicture: idCardPictureName
            }).then(send => {
                console.log("Data stored in DB")
            })

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Account Verification', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />
                <View style={styles.ChooseUser}>
                    <View style={styles.Container}>
                        {/* <Image
                        source={require('../../assets/splash/logo.png')}
                        size={25}
                    /> */}
                        <Text style={styles.chooseUsertxt}>
                            To verify your account please{'\n'}
                        follow the below instructions.{'\n'}
                        This will help you get recognized {'\n'}
                        more and will increase your chances {'\n'}
                        of getting hired.
                    </Text>
                    </View>

                    <View style={styles.BtnView}>
                        <TouchableOpacity style={styles.UserBtn}
                            onPress={this.SelectBillImage}>
                            <Text style={styles.btnText}>Bill Document</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.UserBtn}
                            onPress={this.SelectIDCardImage}>
                            <Text style={styles.btnText}>ID Card Document</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.UserBtn}
                            onPress={this.uploadImageToCloudStorage}>
                            <Text style={styles.btnText}>Upload Document</Text>
                        </TouchableOpacity>
                    </View>


                    {/* <Image
                        source={require('../../assets/splash/logo.png')}
                        // size={25}
                        resizeMode = 'contain'
                        style = {styles.billPic}
                    /> */}



                </View>
            </View>
        );
    }
}

export default VerifyAccount;