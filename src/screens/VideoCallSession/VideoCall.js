//Class code Template

import React from 'react';
import { PermissionsAndroid, Text, StyleSheet, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';


const AgoraVideoCalling = ({ navigation }) => {

    const [joined, setJoined] = React.useState(false)
    //const [agoraAppId, setAgoraAppId] = React.useState('6e9af52037bb4ed18b5c7cccf8a75d15')
    const [channelId, setChannelId] = React.useState('')
    const [token, setToken] = React.useState('0069a859e45a2c944bea92947d3226ad1e6IACnS7MntoAOqvzKrCxB4t/imCkdon8aTC3SZ78lh+wHzJgEodMAAAAAEAAZ33Rzau/EYAEAAQBp78Rg')
    const [peerId, setPeerId] = React.useState([])
    const [videoMute, setVideoMute] = React.useState(false);
    const [audioMute, setAudioMute] = React.useState(false);
    //Generate a UID for local user
    const [uid, setUid] = React.useState(Math.floor(Math.random() * 100));

    const mountedRef = React.useRef(null)
    const engineRef = React.useRef(null)

    // const channelId = await AsyncStorage.getItem('CHANNEL_KEY');
    // Alert.alert(channelId);

    let engine;


    React.useEffect(() => {
        if (!mountedRef.current) {
            configureVideoCall();
            mountedRef.current = true;
        }
    })

    async function configureVideoCall() {

        let channelName = await AsyncStorage.getItem("@Channel_KEY"); // gettng Channel Name from Prev Screen
        console.log(channelName)
        setChannelId(channelName); // setting this to useState Variable.
        console.log(channelId);

        let appId = await AsyncStorage.getItem("@APP_ID");
        engine = await RtcEngine.create(appId);
        engineRef.current = await RtcEngine.create(appId);

        console.log(engineRef.current)
        console.log('this is engineRef.current value after RTCEngine.create');

        engineRef.current?.enableVideo();
        // engineRef.current?.enable();


        // Adding listeners 
        engineRef.current?.addListener('Error', (err) => {
            console.log('error', err)
        });

        engineRef.current?.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)
            if (peerId.indexOf(uid) === -1) {
                //If new user has joined
                setPeerId(...peerId, uid)
            }
        });

        engineRef.current?.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            setPeerId(peerId.filter(id => id !== uid))
        })

        engineRef.current?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            setJoined(true)
        })

        console.log('working')
        await engineRef.current?.joinChannel(token, channelName, null, 0);
        await engineRef.current?.enableAudio(); //Enable the audio
    }

    // function onErrorListener(error) {
    //     console.log(error)
    // }

    // function onUserJoinedListener(uid, elapsed) {
    //     console.log(uid)
    // }

    // function onChannelJoinSuccess(channel, uid, elapsed) {
    //     console.log(channel)
    // }

    async function startCall() {
        //await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

    }

    async function endCall() {
        await engineRef.current?.leaveChannel();
        setPeerId([]);
        setJoined(false)
        console.log('call ended');
        navigation.goBack();
    }

    async function switchCamera() {
        await engineRef.current?.switchCamera();
        console.log('Camera Switched');
    }

    async function toggleAudio() {
        console.log('Audio toggle', audioMute);
        if (!audioMute) {
            await engineRef.current?.disableAudio()
        } else {
            await engineRef.current?.enableAudio()

        }

        // await engineRef.current?.muteLocalAudioStream(!audioMute);
        setAudioMute(!audioMute);
    }

    async function toggleVideo() {
        console.log('Video toggle', videoMute);
        // await engineRef.current?.muteLocalVideoStream(!videoMute);
        if (!videoMute) {
            await engineRef.current?.disableVideo()
        } else {
            await engineRef.current?.enableVideo()

        }

        setVideoMute(!videoMute);

    }

    async function _renderRemoteVideos() {
        return (
            <ScrollView
                style={styles.remoteContainer}
                contentContainerStyle={{ paddingHorizontal: 2.5 }}
                horizontal={true}>
                {peerId.map((value, index, array) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={channelId}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true} />
                    )
                })}
            </ScrollView>
        )
    }

    return <View style={{ flex: 1, }}>
        {joined &&
            <>
                <RtcLocalView.SurfaceView
                    style={{ flex: 1, }}
                    channelId={channelId}
                    renderMode={VideoRenderMode.Hidden}
                />
                {/* {_renderRemoteVideos()} */}

                {peerId != "" &&
                    <RtcRemoteView.SurfaceView
                        style={styles.remote}
                        channelId={channelId}
                        renderMode={VideoRenderMode.Hidden}
                        uid={peerId}
                        zOrderMediaOverlay={true}
                    />
                }

            </>

        }
        <View style={styles.bottomVideoCallBar}>
            <Icon.Button
                style={styles.iconStyle}
                backgroundColor="#0093E9"
                name={audioMute ? 'mic-off' : 'mic'}
                size={24}
                onPress={() => { toggleAudio() }}
            />
            <Icon.Button
                style={styles.iconStyle}
                backgroundColor="#0093E9"
                name="call-end"
                size={24}
                onPress={() => { toggleVideo() }}
            />
            <Icon.Button
                style={styles.iconStyle}
                backgroundColor="red"
                name="call-end"
                size={24}
                onPress={() => { endCall() }}
            />
            <Icon.Button
                style={styles.iconStyle}
                backgroundColor="#0093E9"
                name={videoMute ? 'videocam-off' : 'videocam'}
                size={24}
                onPress={() => { toggleVideo() }}
            />
            <Icon.Button
                style={styles.iconStyle}
                backgroundColor="#0093E9"
                name="camera-alt"
                size={24}
                onPress={() => { switchCamera() }}
            />
        </View>
    </View>

}






// class VideoCall extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }


//     render() {
//         return (
//             <View style={{ flex: 1 }}>

//             </View>
//         );
//     }
// }

export default AgoraVideoCalling;
