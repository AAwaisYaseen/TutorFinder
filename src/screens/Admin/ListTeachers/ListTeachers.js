
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
    Dimensions,
    FlatList,
    LogBox,
} from 'react-native';
import { styles } from './styles';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height: HEIGHT } = Dimensions.get('window');
import { Header } from 'react-native-elements';




class ListTeachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachersData : []
        }
    }



    componentDidMount = () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);


        const subscriber = firestore()
            .collection('teachers')
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
                console.log(" user listing = " , users)
                this.setState({
                    teachersData : users
                })
            });

        return () => subscriber();

    }

    goToNextPage = (item) => {
        this.props.navigation.navigate('DetailsTeacher',
         {
            UserName: item
         });
        
    }




    render() {
        return (
            <View style = {{flex : 1}}>
                <Header
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'All Teachers', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'home', color: '#fff' }}

                    />
                <SafeAreaView>
                    <ScrollView
                        style={{
                            backgroundColor: '#FFFFFF' 
                        }}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <FlatList
                            style={{ marginTop: 20, }}
                            data={this.state.teachersData}
                            keyExtractor={item => item.key}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={() => this.goToNextPage(item)}
                                                    activeOpacity = {1}>
                                    <Card containerStyle={styles.cardStyle}>


                                        <View style={styles.photoContainer}>
                                            <View style={styles.profileImage}>
                                                <Image
                                                    source={{ uri: item.Image }}
                                                    style={styles.picStyle}

                                                />
                                            </View>

                                            <View
                                                style={styles.profileDataContainer}>


                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                    <Text style={styles.nameText}>
                                                        {item.Name}
                                                    </Text>

                                                    <Text style={styles.ratetxt}>
                                                        {"$ " + item.HourlyRate}
                                                    </Text>

                                                </View>

                                                <Text
                                                    style={styles.cityText}>
                                                    {item.City}
                                                </Text>

                                                {/* <View style={{ flexDirection: 'row',backgroundColor : 'red', alignItems: 'center', justifyContent: 'space-between' }}> */}
                                                <Text
                                                    style={styles.ratingTxt}>
                                                    Rating : 3.5
                                                </Text>


                                                {/* <TouchableOpacity style={{ height: 30, width: 70, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}>
                                                    <Text style={{ color: 'white' }}>
                                                        Details
                                                </Text>
                                                </TouchableOpacity> */}

                                            </View>
                                            {/* </View> */}

                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )}
                        />

                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

export default ListTeachers;
