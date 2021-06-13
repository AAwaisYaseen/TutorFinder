import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    ChooseUser: {
        padding: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    Container : {
        alignItems : 'center',
        justifyContent : 'center',
        // marginBottom : 40,
        // marginTop : 50
        paddingLeft : 10,
        paddingRight : 10
    },

    BtnView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    chooseUsertxt: {
        marginTop : 20,
        fontSize: 18,
        color: '#000000',
    },

    UserBtn: {
        // backgroundColor: 'transparent',
        height: 55,
        width: '85%',
        borderWidth : 2,
        borderColor : 'orange',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 20
    },
    btnText : {
        color : '#000000',
        fontSize: 16,
    },

    billPic : {
        backgroundColor : 'yellow',
        width : 200,
        height : 200
    }
})