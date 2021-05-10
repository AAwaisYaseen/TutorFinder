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
    FlatList,
} from 'react-native';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native-elements';


class SearchTutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedSubject: '',
            selectedCity: '',
            selectedHourlyRate: '',
            usersList: [],
        }
        // this.subscriber = firestore()
        //     .collection('teachers').doc('SF0Kgl1JPJPntZjJC9hZ5EeIDZF3')
        //     .onSnapshot(doc =>
        //         this.setState({
        //             name: doc.data().Name
        //         })
        //     )
    }

    // componentDidMount = () => {
    //this.getTeachersData();
    // }

    // getUserData = async () => {
    //     const users = await firestore()
    //         .collection('teachers').doc('SF0Kgl1JPJPntZjJC9hZ5EeIDZF3')
    //         .onSnapshot(doc =>
    //             this.setState({
    //                 name: doc.data().Name
    //             })
    //         )
    //     console.log(users);
    // }

    getTeachersData = () => {

        const subjects = this.state.selectedSubject;
        const location = this.state.selectedCity;
        const rate = this.state.selectedHourlyRate;

        console.log(subjects);
        console.log(location);
        console.log(rate);

        const subscriber = firestore()
            .collection('teachers')
            // Filter results
            .where('Subjects', 'array-contains', subjects)
            //.where("City", "==", ['Lahore','Karachi'])
            .where("City", "==", location)
            .where('HourlyRate', '<=', rate)
            .get()
            .then(querySnapshot => {
                const users = []
                //console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log(" user listing = " + users)
                this.setState({
                    usersList: users
                })
                this.storeData(this.state.usersList);
                this.props.navigation.navigate('TeacherListing')
            });

        return () => subscriber();

    }

    //console.log(" Global Variavle" + this.state.usersList)


    // const routeRef = firestore().collection("teachers");
    // const subjectFilter = subjects ? routeRef.where('Subjects', 'array-contains', subjects) : routeRef;
    // const cityFilter = location ? subjectFilter.where("City", "in", ['Lahore', 'Karachi']) : subjectFilter;
    // const rateFilter = rate ? cityFilter.where("HourlyRate", "<=", rate) : cityFilter;
    // rateFilter.get().then(querySnapshot => {
    //     const users = []
    //     console.log('Total users: ', querySnapshot.size);

    //     querySnapshot.forEach(documentSnapshot => {
    //         console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //         users.push({
    //             ...documentSnapshot.data(),
    //             key: documentSnapshot.id,
    //         });
    //     });
    //     console.log(" user listing = " + users)
    //     this.setState({
    //         usersList: users
    //     })
    // });




    // ------------------------------------------------- //

    // rateFilter.get().then(snapshot => {
    //     // The snapshot returned by `where().get()` does not have a `data()` reference since it returns multiple documents, it has `docs` property which is an array of all the documents matched
    //     snapshot.docs.forEach(doc => {
    //         const docData = { ...doc.data(), id: doc.id };
    //         console.log(docData);
    //     })
    // })

    // ------------------------------------------------- //
    // rateFilter.onSnapshot.docs.forEach(doc => {
    //     const docData = { ...doc.data(), id: doc.id };
    //     console.log(docData);
    // });


    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            console.log("error : " + e)
        }
    }


    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            const Data = jsonValue != null ? JSON.parse(jsonValue) : null
            console.log(Data);
            this.setState({
                usersList: Data
            })
        } catch (e) {
            console.log("error : " + e)
        }
    }



    SearchQuery = () => {
        console.log(this.state.selectedSubject);
        console.log(this.state.selectedCity);
        console.log(this.state.selectedHourlyRate)
    }

    render() {
        return (
            <View style = {{flex : 1}}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff'}}
                    centerComponent={{ text: 'Search Tutor', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                    
                />
                <View style={styles.container}>

                    <Text style={styles.heading}>Find a tutor near you</Text>

                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerView}>
                            <Picker
                                dropdownIconColor='black'
                                mode={'dropdown'}
                                selectedValue={this.state.selectedSubject}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({
                                        selectedSubject: itemValue
                                    })
                                }>
                                <Picker.Item label="Select your subject" value="0" />
                                <Picker.Item label="English" value="English" />
                                <Picker.Item label="Maths" value="Maths" />
                                <Picker.Item label="Urdu" value="Urdu" />
                                <Picker.Item label="General Studies" value="General Studies" />
                                <Picker.Item label="Programming" value="Programming" />
                                <Picker.Item label="Physics" value="Physics" />
                                <Picker.Item label="Chemistry" value="Chemistry" />
                            </Picker>
                        </View>

                        <View style={styles.pickerView}>
                            <Picker
                                dropdownIconColor='black'
                                mode={'dropdown'}
                                selectedValue={this.state.selectedCity}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({
                                        selectedCity: itemValue
                                    })
                                }>
                                <Picker.Item label="Select your city" value="0" />
                                <Picker.Item label="Lahore" value="Lahore" />
                                <Picker.Item label="Islamabad" value="Islamabad" />
                                <Picker.Item label="Faisalabad" value="Faisalabad" />
                                <Picker.Item label="Gujranwala" value="Gujranwala" />
                                <Picker.Item label="Sargodha" value="Sargodha" />
                                <Picker.Item label="Karachi" value="Karachi" />
                            </Picker>
                        </View>

                        <View style={styles.pickerView}>
                            <Picker
                                dropdownIconColor='black'
                                mode={'dropdown'}
                                selectedValue={this.state.selectedHourlyRate}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({
                                        selectedHourlyRate: itemValue
                                    })
                                }>
                                <Picker.Item label="Select hourly rate" value="0" />
                                <Picker.Item label="5$" value="5" />
                                <Picker.Item label="10$" value="10" />
                                <Picker.Item label="20$" value="20" />
                                <Picker.Item label="40$" value="40" />
                            </Picker>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.SearchBtn}
                        //onPress={this.SearchQuery}
                        onPress={this.getTeachersData}
                    >
                        <Text style={styles.SearchBtnText}>Search</Text>
                    </TouchableOpacity>


                    {/* <Button style = {{marginTop : 20}} 
                 title = 'Live Location'
                    onPress = {() => this.props.navigation.navigate("Location")}>
                </Button> */}

                    {/* <FlatList
                    data={this.state.usersList}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>User ID: {item.key}</Text>
                            <Text>User Name: {item.Name}</Text>

                            <Image style={{ width: 50, height: 50 }}
                                source={{ uri: item.Image }}
                            />
                        </View>
                    )}
                /> */}

                </View>
            </View>
        );
    }

}

export default SearchTutor;