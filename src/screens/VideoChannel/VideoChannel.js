//Class code Template

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { styles } from './styles';
import { Header } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import requestCameraAndAudioPermission from './Permission';





class VideoChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ChannelName: '', //Set a default channel or leave blank
            AppID : '9a859e45a2c944bea92947d3226ad1e6'
        }

        if (Platform.OS === 'android') {
            //Request required permissions from Android
            requestCameraAndAudioPermission().then(_ => {
                console.log('requested!');
            });
        }
    }


    handleChannelSubmit = async () => {
        try {
            const channel = this.state.ChannelName;
            const AppID = this.state.AppID
            if (channel == '') {
                Alert.alert("Enter Channel ID");
            }
            else {
                await AsyncStorage.setItem("@Channel_KEY",channel);
                await AsyncStorage.setItem("@APP_ID",AppID);

                //await AsyncStorage.setItem('CHANNEL_KEY', channel);
                console.log('yesss');
                console.log(channel)
                this.props.navigation.navigate('VideoCallSession');
            }

        } catch (e) {
            console.log(e)
        }

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{
                        icon: 'menu', color: '#fff',
                        onPress: () => this.props.navigation.toggleDrawer()
                    }}
                    centerComponent={{ text: 'Admin Dashboard', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />
                <View style={styles.container}>
                    <Text style={styles.formLabel}>Channel Name</Text>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={ChannelName => this.setState({ ChannelName })}
                        value={this.state.ChannelName}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            title="Start Call!"
                            onPress={this.handleChannelSubmit}
                            style={styles.submitButton}>
                            <Text style={styles.white}> Start Call </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default VideoChannel;
