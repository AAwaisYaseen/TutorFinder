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
    PermissionsAndroid
} from 'react-native';
import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import { Marker, } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';


// import MapView from 'react-native-maps';

class LiveLocationMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            markers: [
                {
                    id: 'avahgchv12e13',
                    title: 'Ali',
                    description: 'Shamsher Town , Street # 1 , Sargodha',
                    latitude: 32.08961,
                    longitude: 72.671922,
                },
                {
                    id: 'avahgchvwe12e13',
                    title: 'Aslam',
                    description: 'Karachi',
                    latitude: 32.080886,
                    longitude: 72.686232,
                },
                // {
                //     latitude: LATITUDE - SPACE * 2,
                //     longitude: LONGITUDE - SPACE * 2,
                // },
            ],

            // staticData: [
            //     { coordinates: { latitude: 37.78383, longitude: -122.405766 } , id : 'avahgchv12e13' },
            //     { coordinates: { latitude: 37.78584, longitude: -122.405478 }  , id : 'avahgchwfwev12e13'},
            //     { coordinates: { latitude: 37.784738, longitude: -122.402839 }  , id : 'avahgchwev12e13'},
            // ],
            Livelatitude: 123.223,
            liveLongitude: 123.5655,

            // Livelatitude: 31.4949720,
            // liveLongitude: 74.3711540,

        }
    }

    /* ComponentDidMount function gets called when screen opens*/

    componentDidMount = async () => {

        /* Getting Live location of Current User (Student)
         and saving location that into variables.*/


        /* Getting Permission to use location*/
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
            console.log("You can use the ACCESS_FINE_LOCATION")

            /* Get  Current location and save into Variables.*/
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    this.setState({
                        Livelatitude: position.coords.latitude,
                        liveLongitude: position.coords.longitude
                    })

                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        else {
            console.log("ACCESS_FINE_LOCATION permission denied")
        }

        /*Getting Teachers Location from database 
        and displaying that in maps*/
        this.getTeachersData();

    }



    getTeachersData = () => {
        const subscriber = firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                const users = [] // Local variable
                //console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    users.push({
                        latitude: documentSnapshot.data().Latitude,
                        longitude: documentSnapshot.data().Longitude,
                        name: documentSnapshot.data().Name,
                        address: documentSnapshot.data().Address,
                        key: documentSnapshot.id,
                    });
                });
                console.log(" user listing = ", users)
                // Saving that local variale data into Glocabal variable.
                this.setState({
                    usersList: users
                })
                // this.storeData(this.state.usersList);
                // this.props.navigation.navigate('TeacherListing')
            });

        return () => subscriber();

    }

    render() {
        const Data = [
            {
                title: 'Ali',
                latitude: 32.08961,
                longitude: 72.671922,
                description: 'ahbdch'
            },
            {
                title: 'Aslam',
                latitude: 32.080886,
                longitude: 72.686232,
                description: 'bec uwhcjw '

            },
        ]
        return (
            <View style={styles.container}>

                {/* Displaying Student Location Code*/}
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    zoomControlEnabled = {true}
                    showsUserLocation={true}
                    region={{
                        latitude: this.state.Livelatitude,
                        longitude: this.state.liveLongitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,

                    }}
                // initialRegion={{
                //     latitude: 37.783363,
                //     longitude: -122.403908,
                //     latitudeDelta: 0.015922,
                //     longitudeDelta: 0.015421,
                // }}
                >

                    {/* Displaying Teacher Location Code*/}

                    {this.state.usersList.map((marker) => (
                        <Marker
                            showsUserLocation={true}
                            key={marker.key}
                            coordinate={{
                                // marker.coordinates
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.name}
                            description={marker.address}
                        />
                    ))}

                </MapView>
            </View>
        );
    }
}

export default LiveLocationMaps;
