import {
    StyleSheet,
    Dimensions,
} from 'react-native';
const scoreCircleSize = 300

export const styles = StyleSheet.create({
    MainContainer : {
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ffffff'
    },
    questionContainer : {
        
    },




    score: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scoreCircleSize,
        height: scoreCircleSize,
        borderRadius: scoreCircleSize / 2,
        backgroundColor: "#E87430"
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#81c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        width: 55,
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }



})