// styles Template
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    billPic: {
        // backgroundColor: 'yellow',
        width: 300,
        height: 350,
        // marginBottom: 5,
        // borderWidth: 2,
        // borderColor: 'black'

    },

    ImageViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,


    },
    titleText: {
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,

    },
    downloadBtn: {
        marginTop: 5,
        width: 270,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black'

    },
    btnTextDownload: {
        color: 'black',
        fontSize: 16,
    },

    UserBtn: {
        backgroundColor: '#E87430',
        height: 45,
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },


    UserBtnDisabled: {
        backgroundColor: 'grey',
        height: 45,
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    btnText: {
        color: '#ffffff',
        fontSize: 16,
    },
    VerifyBtnView : {
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
        marginBottom : 20
    }
})


