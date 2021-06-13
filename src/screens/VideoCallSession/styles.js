// styles Template



import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}


export const styles = StyleSheet.create({
    bottomVideoCallBar: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#0093E9',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    iconStyle: {
        height: 40,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5
    },
    remote: {
        margin : 8,
        width: 120,
        height: 150,
        position : 'absolute',
        top: 5,
        marginHorizontal: 2.5,
    },
})


