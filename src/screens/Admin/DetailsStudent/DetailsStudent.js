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
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';





class DetailsStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { route } = this.props
        /* 2. Get the param */
        const { UserName } = route.params;
        const latitudeLive = UserName.Latitude;
        const longitudeLive = UserName.Longitude;
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* <View style={styles.insideScrollContainer}> */}

                <View style={styles.imageViewContainer}>
                    <Image
                        source={require('../../../assets/user.png')}
                        // source={{ uri: UserName.Image }}
                        style={styles.imageView}
                    />
                </View>


                <View style={styles.infoContainer}>


                    <View style={styles.SingleInfoView}>
                        <Text style={styles.headingText}>Name</Text>
                        <Text style={styles.nametxt}>
                            {UserName.Name}
                        </Text>
                    </View>

                    <View style={styles.SingleInfoView}>
                        <Text style={styles.headingText}>email</Text>
                        <Text style={styles.nametxt}>
                            {UserName.Email}
                        </Text>
                    </View>


                    <View style={styles.SingleInfoView}>
                        <Text style={styles.headingText}>City</Text>
                        <Text style={styles.citytxt}>
                            {UserName.City}
                        </Text>

                    </View>

                    <View style={styles.SingleInfoView}>
                        <Text style={styles.headingText}>Phone Number</Text>
                        <Text style={styles.phonetxt}>
                            {UserName.Phone}
                        </Text>

                    </View>




                    <View style={styles.SingleInfoView}>
                        <Text style={styles.headingText}>Address</Text>
                        <Text style={styles.SummaryAndExperinceText}>
                            {UserName.Address}
                        </Text>

                    </View>


                    <View style={styles.SingleInfoView}>
                        <Text style={styles.headingText}>
                            Location
                </Text>

                        <View style={styles.containerMap}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                // showsUserLocation={true}
                                region={{
                                    latitude: latitudeLive,
                                    longitude: longitudeLive,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: latitudeLive, longitude: longitudeLive }}
                                    showsUserLocation={true}></Marker>

                            </MapView>
                        </View>
                    </View>
                </View>




                {/* </View> */}


                {/* </View> */}
            </ScrollView>
        );
    }
}

export default DetailsStudent;
