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
import { Header } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import MapViewDirections from 'react-native-maps-directions';


class ClassName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapReady: false,
            coordinates:
                [
                    {
                        latitude: 48.8587741,
                        longitude: 2.2069771,
                    },
                    {
                        latitude: 48.8323785,
                        longitude: 2.3361663,
                    },
                ]
        }
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }


    render() {

        // const origin = { latitude: 37.3318456, longitude: -122.0296002 };
        // const destination = { latitude: 37.771707, longitude: -122.4053769 };
        // const GOOGLE_MAPS_APIKEY = 'AIzaSyD_xoB5g9AnzQUxAvpc3T2NynUjLNoo4-k';
        const { coordinates } = this.state
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{
                        icon: 'menu', color: '#fff',
                        onPress: () => this.props.navigation.toggleDrawer()
                    }}
                    centerComponent={{ text: 'Directions', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />
                <View style={styles.containerMap}>

                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        zoomControlEnabled={true}
                        showsUserLocation={true}
                        mapType='standard'
                        showsScale
                        showsCompass
                        showsPointsOfInterest
                        showsBuildings
                        // region={{
                        //     latitude: this.state.Livelatitude,
                        //     longitude: this.state.liveLongitude,
                        //     latitudeDelta: 0.015,
                        //     longitudeDelta: 0.0121,

                        // }}
                        initialRegion={{
                            latitude: coordinates[0].latitude,
                            longitude: coordinates[0].longitude,
                            latitudeDelta: 0.0622,
                            longitudeDelta: 0.0121,
                        }}
                    >

                        {this.state.isMapReady &&

                            <View>
                                <Marker coordinate={coordinates[0]} />
                                <Marker coordinate={coordinates[1]} />
                                <Polyline
                                    coordinates={coordinates}
                                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                    strokeColors={['#7F0000']}
                                    strokeWidth={6}
                                />
                            </View>
                        }
                    </MapView>
                </View>

            </View>
        );
    }
}

export default ClassName;

export const styles = StyleSheet.create({
    containerMap: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

})
