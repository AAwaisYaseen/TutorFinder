import React from 'react';
import {
    ImageBackground,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    Dimensions,
    SafeAreaView,
    FlatList,
    Fragment,
    KeyboardAvoidingView,
    TouchableHighlight,
    Image,
    LogBox,
} from 'react-native';
import { Card } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height: HEIGHT } = Dimensions.get('window');
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native-elements';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



var StaffData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Williams',
        city: 'Sargodha',
        contactno: 675443354,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53atbb28ba',
        name: 'Brad',
        city: 'Sargodha',
        contactno: 134234235,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-4',
        name: 'Bing',
        city: 'Sargodha',
        contactno: 6754433224,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53ryabb28ba',
        name: 'John',
        city: 'Sargodha',
        contactno: 4554433454,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-rya567788ba',
        name: 'Ken',
        city: 'Sargodha',
        contactno: 2348234898,
    },

    // {
    //     id: 'bd7acbea-c1b1-46c2-aed5-rya567788btya',
    //     name: 'Joe',
    //     city: 'Sargodha',
    //     contactno: 2348234898,
    // },
    // {
    //     id: 'bd7acbea-c1b1-46c2-aed5-rya567788bqwa',
    //     name: 'Diele',
    //     city: 'Sargodha',
    //     contactno: 2348234898,
    //},
];

export default class ConnectionsStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connections: []
        }

        this.getAllConnectionsData();
    }

    componentDidMount = async () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }


    getAllConnectionsData = async() => {

        const currentUserID = auth().currentUser.uid;

        const subscriber = firestore()
            .collection('users')
            .doc(currentUserID)
            .collection("connections")
            .get()
            .then(querySnapshot => {
                const users = []
                //console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                this.setState({
                    connections: users
                })
            });

        return () => subscriber();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Connections', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />

                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>Connections</Text>
                </View>
                <ScrollView
                    style={{
                        // backgroundColor: 'yellow' 
                    }}
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <FlatList
                        // style={{ marginTop: 20 }}
                        data={this.state.connections}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => (

                            <View>

                                <TouchableOpacity
                                    // onPress={() => this.goToNextPage(item)}
                                    activeOpacity={1}>


                                    <View style={styles.photoContainer}>
                                        <Image
                                            // source={{ uri: item.Image }}
                                            source={require('../../assets/teacherList/simplepic.jpg')}
                                            style={styles.picStyle}

                                        />


                                        <Text style={styles.nameText}>
                                            {item.Name}
                                                        {/* Ruben Dias */}
                                            </Text>

                                    </View>

                                </TouchableOpacity>


                                <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
                                </View>

                            </View>
                        )}
                    />

                </ScrollView>
            </View>
        );
    }
}