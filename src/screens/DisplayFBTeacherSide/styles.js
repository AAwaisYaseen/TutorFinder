import { StyleSheet } from 'react-native';
import {
    Dimensions,
} from 'react-native';
const { height: HEIGHT } = Dimensions.get('window');
export const styles = StyleSheet.create({
    customViewFB: {
        padding: 8,
        // backgroundColor: 'pink'
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    TopView: {
        flexDirection: 'row',
    },
    ratingTxt: {
        fontSize: 22,
        color: 'orange',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    nameRatingView: {
        marginLeft: 20,
    },
    feedbackTxt: {
        // flexWrap: 'wrap',
        fontStyle: 'italic',
        fontSize: 16,
        fontWeight: '700'
    },
    feedbackView: {
        // backgroundColor : 'red',
        width: '90%',
        marginTop: 17,
        // flexWrap : 'wrap'
    },
    Nametxt: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rating: {

    },
    picStyle: {
        width: 55,
        height: 55,
        backgroundColor: 'red',
        borderRadius: 60 / 2,
        marginLeft: 10
        //backgroundColor : 'red'
    },
    noDataContainer : {
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
    },
    noFeedbackText : {
        fontSize : 16,
        fontWeight : 'bold',
    }
})