import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        alignItems: 'center',
        paddingTop : 50
        // justifyContent: 'center'
    },

    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom : 30,
    },

    SearchBtn: {
        backgroundColor: '#E87430',
        height: 55,
        width: '85%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    SearchBtnText: {
        color: '#ffffff',
        fontSize: 16,
    },

    pickerContainer: {
        width: '100%',
        alignItems: 'center'
    },
    pickerView: {
        marginTop : 10,
        marginBottom : 10,
        width: '85%',
        borderColor: 'black',
        borderWidth: 1
    }

})