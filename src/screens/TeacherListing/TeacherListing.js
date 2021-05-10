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

    {
        id: 'bd7acbea-c1b1-46c2-aed5-rya567788btya',
        name: 'Joe',
        city: 'Sargodha',
        contactno: 2348234898,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-rya567788bqwa',
        name: 'Diele',
        city: 'Sargodha',
        contactno: 2348234898,
    },
];

export default class TeacherListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teacherDataList: []
        }
    }

    componentDidMount = async () => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            const Data = jsonValue != null ? JSON.parse(jsonValue) : null
            console.log(Data);
            this.setState({
                teacherDataList: Data
            })
        } catch (e) {
            console.log("error : " + e)
        }

    }


    goToNextPage = (item) => {
        this.props.navigation.navigate('StudentHome',
         {
            UserName: item
         });
        
    }


    render() {
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
                            data={this.state.teacherDataList}
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