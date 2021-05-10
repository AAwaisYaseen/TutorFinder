import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    ChooseUser: {
        padding: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        marginTop : 20,
        fontSize: 18,
        color: '#000000',
    },

    UserBtn: {
        backgroundColor: '#E87430',
        height: 55,
        width: '85%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 10
    },
    btnText : {
        color : '#ffffff',
        fontSize: 16,
    }
})