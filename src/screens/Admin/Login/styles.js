import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    ChooseUser: {
        padding: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    loginTextCont : {
        marginTop : 20,
        width : '100%',
        //backgroundColor : 'red',
        paddingLeft : 30
    },


    input: {
        height: 45,
        width : '100%',
        backgroundColor : '#F5F5F5',
        color : '#000000',
    },

    inputCont : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        //backgroundColor: 'red'
    },

    inputView : {
        width : '80%',
        marginBottom : 15,
    },

    Container : {
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : 40,
    },

    BtnView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    chooseUsertxt: {
        marginTop : 5,
        fontSize: 18,
        color: '#000000',
    },

    WelcomeTxt: {
        fontSize : 24,
        color : '#000000',
        fontWeight : 'bold',

    },

    UserBtn: {
        backgroundColor: '#E87430',
        height: 55,
        width: '85%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 20,
    },
    btnText : {
        color : '#ffffff',
        fontSize: 16,
    },
    registerView : {
        paddingTop : 40,
        flexDirection : 'row',

    }
})