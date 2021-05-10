import { StyleSheet } from 'react-native';
import {
  Dimensions,
} from 'react-native';
const { height: HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    containerMap: {
        marginTop : 20,
        height: 300,
        borderWidth : 2,
        borderColor : 'black'
      },
      map: {
          height : 300
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      nametxt : {
          fontSize : 22,
          fontStyle : 'italic',
          fontWeight : 'bold',
          color : '#000000'
      },
      citytxt : {
        fontSize : 16,
        fontStyle : 'italic',
        fontWeight : 'bold',
        color : 'grey'
    },
        phonetxt : {
        fontSize : 16,
        fontStyle : 'italic',
        fontWeight : 'bold',
        color : 'grey',
        marginBottom : 5,
    },
    ratetxt : {
        fontSize : 16,
        fontStyle : 'italic',
        fontWeight : 'bold',
        color : 'green'
    },
    UserBtn: {
        backgroundColor: '#448aff',
        height: 45,
        width: '75%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 20,
    },

    UserBtnReviews: {
        backgroundColor: 'green',
        height: 45,
        width: '75%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 10,
    },

    UserBtnFeedback: {
        backgroundColor: 'purple',
        height: 45,
        width: '75%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 10,
    },
    btnText : {
        color : '#ffffff',
        fontSize: 16,
    },
    btnContainer : {
        marginTop : 10,
        alignItems : 'center', 
        justifyContent : 'center',
        width : '100%',
    }
});