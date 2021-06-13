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
            check: true
        }
    }



    componentDidMount = async () => {

        //    await this.getImageNaem()

        //    await this.getData()

        this._unsubscribe = this.props.navigation.addListener('focus', () => {

        this.getImageNameRefFromDatabase()

        });

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





    getImageDataFromStorage = async () => {

        let name = this.state.billPicName

        let imageRefBill = storage().ref(name);
        let imageRefIDCard = storage().ref(this.state.IDCardPicName);


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

        this.removeAsyncData()

    }

    removeAsyncData = async () => {
        await AsyncStorage.removeItem('@bill')
        await AsyncStorage.removeItem('@IDCard')

        console.log("Data Khaali")
    }


    getImageNameRefFromDatabase = async () => {


            const TeacherID = await AsyncStorage.getItem('@Teacher_UID_Verification')

            firestore()
                .collection('teachers')
                .doc(TeacherID)
                .get()
                .then(documentSnapshot => {
                    let Bill = documentSnapshot.data().BillPicture
                    let IDCard = documentSnapshot.data().IDCardPicture


                    AsyncStorage.setItem('@bill', Bill)
                    AsyncStorage.setItem('@IDCard', IDCard)


                    console.log("Data saved")



                })

            this.saveDataToLocalStates()


    }


    saveDataToLocalStates = async () => {

        const getpin1 = await AsyncStorage.getItem('@bill')
        const getpin2 = await AsyncStorage.getItem('@IDCard')

        this.setState({
            billPicName: getpin1,
            IDCardPicName: getpin2,
        })

        console.log('Images Name Retrieved')
        console.log('Bill', this.state.billPicName)
        console.log('IDCard', this.state.IDCardPicName)


        if (this.state.billPicName === 'dummy') {
            this.setState({
                check: false
            })
        } else {
            this.getImageDataFromStorage()
        }





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

                    <Image
                        source={{
                            uri: this.state.billImageUrl,
                        }}

                        // {uthis.state.profileImageUrl}            // size={25}
                        resizeMode='contain'
                        style={styles.billPic}
                    />

                    <Image
                        source={{
                            uri: this.state.idCardImageUrl,
                        }}

                        // {uthis.state.profileImageUrl}            // size={25}
                        resizeMode='contain'
                        style={styles.billPic}
                    />

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
