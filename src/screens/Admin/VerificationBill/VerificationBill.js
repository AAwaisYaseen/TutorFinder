//Class code Template


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
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';






class VerificationBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billImageUrl: '',
            idCardImageUrl: '',
            // ImageName: 'profile12ghv56b12t7',
            billPicName: '',
            IDCardPicName: '',
            check: true,
            VerifiedCheck: false
        }
    }



    componentDidMount = async () => {

        //    await this.getImageNaem()

        //    await this.getData()

        // this._unsubscribe = this.props.navigation.addListener('focus', () => {

        await this.getImageNameRefFromDatabase()

        // });

        // return this._unsubscribe();



        // await this.saveDataToLocalStates()

        // await this.getImageDataFromStorage()

        // if (this.state.billPicName === 'dummy') {
        //     this.setState({
        //         check: false
        //     })
        // } else {
        //     await this.getImageDataFromStorage()
        // }
    }

    // componentWillUnmount() {
    //     this._unsubscribe();
    //   }





    getImageDataFromStorage = async (bill, IDcard, isVerified) => {

        // let name = this.state.billPicName

        let imageRefBill = storage().ref(bill);
        let imageRefIDCard = storage().ref(IDcard);


        imageRefBill
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({ billImageUrl: url });
                console.log("Image succeffult=y retreived")
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));

        imageRefIDCard
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({ idCardImageUrl: url });
                console.log("Image succeffult=y retreived")
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));

        // this.removeAsyncData()

        this.setState({
            VerifiedCheck: isVerified
        })

    }

    // removeAsyncData = async () => {
    //     await AsyncStorage.removeItem('@bill')
    //     await AsyncStorage.removeItem('@IDCard')

    //     console.log("Data Khaali")
    // }


    getImageNameRefFromDatabase = async () => {


        const TeacherID = await AsyncStorage.getItem('@Teacher_UID_Verification')

        firestore()
            .collection('teachers')
            .doc(TeacherID)
            .get()
            .then(documentSnapshot => {
                let Bill = documentSnapshot.data().BillPicture
                let IDCard = documentSnapshot.data().IDCardPicture
                let isVerified = documentSnapshot.data().Verified



                // AsyncStorage.setItem('@bill', Bill)
                // AsyncStorage.setItem('@IDCard', IDCard)


                console.log("Data saved")

                if (Bill === 'dummy') {

                    this.setState({
                        check: false
                    })

                } else {
                    this.getImageDataFromStorage(Bill, IDCard, isVerified)
                }
            })

        // this.saveDataToLocalStates()
    }


    // saveDataToLocalStates = async () => {

    //     const getpin1 = await AsyncStorage.getItem('@bill')
    //     const getpin2 = await AsyncStorage.getItem('@IDCard')

    //     this.setState({
    //         billPicName: getpin1,
    //         IDCardPicName: getpin2,
    //     })

    //     console.log('Images Name Retrieved')
    //     console.log('Bill', this.state.billPicName)
    //     console.log('IDCard', this.state.IDCardPicName)


    //     if (this.state.billPicName === 'dummy') {
    //         this.setState({
    //             check: false
    //         })
    //     } else {
    //         this.getImageDataFromStorage()
    //     }





    // }

    verifyTeacherAccount = async () => {

        const TeacherID = await AsyncStorage.getItem('@Teacher_UID_Verification')

        firestore()
            .collection('teachers')
            .doc(TeacherID)
            .update({
                Verified: true
            })
            .then(() => {
                console.log('Account Verified!');
            });

    }




    getImageNaem = () => {
        this.setState({
            billPicName: 'IDCardVision'
        })

        console.log("data aded")
    }


    getData = () => {

        // let name = this.state.billPicName;
        // let hello = "IDCardVision";
        let imagetwo = storage().ref(this.state.billPicName);



        // let imageRefBill = storage().refFromURL("gs://tutorfinder-867e0.appspot.com/profile12ghv56b12t7");


        imagetwo
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({ billImageUrl: url });
                console.log("Image succeffult=y retreived")
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));


    }







    render() {

        const { check } = this.state;

        return (

            check ? (
                <View style={{ flex: 1 }} >
                    <ScrollView>

                        <View style={styles.ImageViewContainer}>

                            <Text style={styles.titleText}>Picture of Bill</Text>

                            <View style={{ borderWidth: 2, borderColor: 'black', }}>
                                <Image
                                    source={{
                                        uri: this.state.billImageUrl,
                                    }}

                                    // {uthis.state.profileImageUrl}            // size={25}
                                    resizeMode='contain'
                                    style={styles.billPic}
                                />
                            </View>

                            <TouchableOpacity style={styles.downloadBtn}>
                                <Text style={styles.btnTextDownload}>Download</Text>
                            </TouchableOpacity>


                        </View>




                        <View style={styles.ImageViewContainer}>

                            <Text style={styles.titleText}>Picture of ID Card</Text>

                            <View style={{ borderWidth: 2, borderColor: 'black', }}>
                                <Image
                                    source={{
                                        uri: this.state.idCardImageUrl,
                                    }}

                                    resizeMode='contain'
                                    style={styles.billPic}
                                />
                            </View>

                            <TouchableOpacity style={styles.downloadBtn}>
                                <Text style={styles.btnTextDownload}>Download</Text>
                            </TouchableOpacity>


                        </View>

                        <View style = {styles.VerifyBtnView}>
                            
                            {this.state.VerifiedCheck ? (
                                <TouchableOpacity style={styles.UserBtnDisabled}
                                    disabled
                                    // disabled={this.state.VerifiedCheck ? true : false}
                                    onPress={this.verifyTeacherAccount}>
                                    <Text style={styles.btnText}>User already Verified</Text>
                                </TouchableOpacity>


                            )
                                : (
                                    <TouchableOpacity style={styles.UserBtn}
                                        onPress={this.verifyTeacherAccount}>
                                        <Text style={styles.btnText}>Verify this user</Text>
                                    </TouchableOpacity>


                                )}

                        </View>



                    </ScrollView>
                </View >
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>This User is yet to uploaded any Verification Details</Text>
                </View>

            )
        )
    }
}

export default VerificationBill;

















    // getImageDataFromStorage = () => {

    //     let imageRefBill = storage().ref('/' + this.state.billPicName);
    //     let imageRefIDCard = storage().ref('/' + this.state.IDCardPicName);


    //     imageRefBill
    //         .getDownloadURL()
    //         .then((url) => {
    //             //from url you can fetched the uploaded image easily
    //             this.setState({ billImageUrl: url });
    //             console.log("Image succeffult=y retreived")
    //         })
    //         .catch((e) => console.log('getting downloadURL of image error => ', e));

    //     imageRefIDCard
    //         .getDownloadURL()
    //         .then((url) => {
    //             //from url you can fetched the uploaded image easily
    //             this.setState({ idCardImageUrl: url });
    //             console.log("Image succeffult=y retreived")
    //         })
    //         .catch((e) => console.log('getting downloadURL of image error => ', e));

    // }













    // getImageNameRefFromDatabase = async () => {
    //     const TeacherID = await AsyncStorage.getItem('@Teacher_UID_Verification')

    //     firestore()
    //         .collection('teachers')
    //         .doc(TeacherID)
    //         .get()
    //         .then(documentSnapshot => {
    //             const Bill = documentSnapshot.data().BillPicture
    //             const IDCard = documentSnapshot.data().IDCardPicture

    //             this.setState({
    //                 billPicName: Bill,
    //                 IDCardPicName: IDCard,
    //             })

    //             console.log('Images Name Retrieved')
    //             console.log('Bill', this.state.billPicName)
    //             console.log('IDCard', this.state.IDCardPicName)



    //         })
    // }







    // componentDidMount = async() => {
    //     const TeacherID = await AsyncStorage.getItem('@Teacher_UID_Verification')

    //     firestore()
    //         .collection('teachers')
    //         .doc(TeacherID)
    //         .get()
    //         .then(documentSnapshot => {
    //             const Bill = documentSnapshot.data().BillPicture
    //             const IDCard = documentSnapshot.data().IDCardPicture

    //             this.setState({
    //                 billPicName: Bill,
    //                 IDCardPicName: IDCard,
    //             })

    //             console.log('Images Name Retrieved')
    //             console.log('Bill', this.state.billPicName)
    //             console.log('IDCard', this.state.IDCardPicName)
    //         })


    //     let imageRefBill = storage().ref('/' + this.state.billPicName);
    //     // let imageRefIDCard = storage().ref('/' + this.state.IDCardPicName);


    //    await imageRefBill
    //         .getDownloadURL()
    //         .then((url) => {
    //             //from url you can fetched the uploaded image easily
    //             this.setState({ billImageUrl: url });
    //             console.log("Image succeffult=y retreived")
    //         })
    //         .catch((e) => console.log('getting downloadURL of image error => ', e));

    // //    await imageRefIDCard
    // //         .getDownloadURL()
    // //         .then((url) => {
    // //             //from url you can fetched the uploaded image easily
    // //             this.setState({ idCardImageUrl: url });
    // //             console.log("Image succeffult=y retreived")
    // //         })
    // //         .catch((e) => console.log('getting downloadURL of image error => ', e));




    // }
