import { StyleSheet } from 'react-native';
import {
    Dimensions,
} from 'react-native';
const { height: HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    scrollViewContainer: {
        padding: 8,
        backgroundColor: 'white',
    },

    insideScrollContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 8,
        marginTop: 20
    },

    imageViewContainer: {
        backgroundColor: '#eeeeee',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageView: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },

    infoContainer: {
        width: '100%',
        // backgroundColor : 'red',
        paddingLeft: 5
    },

    SummaryAndExperinceView: {
        padding: 10
    },

    headingText: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    SingleInfoView: {
        // backgroundColor: 'red',
        padding: 10
    },
    SummaryAndExperinceText: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'grey'

    },

    gradesAndSubjectContainer: {
        width: '100%',
        padding: 8,
        marginBottom: 10,
    },


    gradesAndSubjectTitle: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    gradesAndSubjectListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    gradesAndSubjectListView: {
        //width : 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#c85a54',
        alignItems: 'center',
        margin: 3,
        //justifyContent: 'center',
        padding: 8,
    },

    locationTitle: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    containerMap: {
        marginTop: 20,
        height: 300,
        borderWidth: 2,
        borderColor: 'black'
    },
    map: {
        height: 300
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nametxt: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'grey'
    },
    citytxt: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'grey'
    },
    phonetxt: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'grey',
    },
    ratetxt: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'green'
    },
    UserBtn: {
        backgroundColor: '#E87430',
        height: 45,
        width: '75%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    UserBtnReviews: {
        backgroundColor: 'green',
        height: 45,
        width: '75%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    UserBtnFeedback: {
        backgroundColor: 'purple',
        height: 45,
        width: '75%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    btnText: {
        color: '#ffffff',
        fontSize: 16,
    },
    btnContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
});