import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    container : {
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ffffff'
    },

    insideContainer : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        // backgroundColor : 'pink'
    },

    UserBtn: {
        backgroundColor: '#E87430',
        height: 50,
        width: '70%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 20,
    },
    btnText : {
        color : '#ffffff',
        fontSize: 16,
    },
    inputView: {
        width: '80%',
        marginBottom: 15,
    },
    inputSummary: {
        padding : 8,
        height: 120,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000000',
        borderRadius : 4,
        // elevation : 5,
        borderColor : 'grey',
        borderWidth : 1,
    },
    txtHeading : {
        fontSize : 22, 
        fontWeight : 'bold',
    }
})