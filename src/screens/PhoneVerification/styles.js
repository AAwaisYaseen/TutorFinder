import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({

    SplashContainer : {
        paddingTop : 5,
        paddingBottom : 15,
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : '#FFFFFF',
    },

    getStrtdBtnContainer : {
        height : 45,
        width : '90%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#E87430',
        //backgroundColor : '#6C648B',
        borderRadius : 5,
        borderWidth : 0.5,
        borderColor : 'white'
    },

    btnTextContainer : {
        color : 'white',
        fontSize : 16,
        fontWeight : "bold"
    },

    headerContainer : {
        //height : 60,
        width : '100%',
        // backgroundColor : 'white',
        // alignItems : 'center',
        // justifyContent : 'center',
        // borderBottomWidth : 0.8,
        // borderColor : 'black',

    },
    PhoneNoContainer : {
        height : 300,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        marginBottom : 70,
        //backgroundColor : 'yellow',
    },

    txtboxPhone : {
        paddingLeft : 20,
        //backgroundColor : 'red',
        height : 56,
        width : '85%',
        borderWidth : 1,
        borderRadius : 4,
        borderColor : '#D1D1D1',
        textAlign : 'center'
    
    },

    txtboxCode : {
        paddingLeft : 20,
        //backgroundColor : 'red',
        height : 56,
        width : '85%',
        borderWidth : 1,
        borderRadius : 4,
        borderColor : '#D1D1D1',
        textAlign : 'center',
        //backgroundColor : 'red'
    
    },

    txtMale : {
        fontSize : 26,
        color : '#FFFFFF',
        fontWeight : "bold"
    },
    txtFemale : {
        fontSize : 26,
        color : '#FFFFFF',
        fontWeight : "bold"
    },
    txtGender : {
        color : '#6C648B',
        fontSize : 16,
        fontWeight : 'bold'
    },
    pickerStyle: {
        margin : 0,
        //backgroundColor : 'purple',
        height: 50,
        width: '100%',
        //borderWidth : 3,
        //borderColor : 'red',
        //borderRadius : 15,
        //borderTopColor : 'white',
        //borderBottomColor : 'white'
    }

})