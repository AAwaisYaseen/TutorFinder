// styles Template



import {
    StyleSheet,
    Dimensions,
} from 'react-native';
const { height: HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
    scrollContainer: {
        height: HEIGHT
      },
    
      headerStyle: {
        backgroundColor: '#076fed',
      },
    
      HeaderBodyStyle: {
        ...Platform.select({
          ios: {
            flex: 3,
          },
          android: {
          },
        }),
      },
    
    
      // is kah baad
      photoContainer: {
        //flex: 2.5,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        //backgroundColor: '#f5f5f5',
      },
    
      cardStyle: {
        //borderRadius: 12,
        elevation: 15,
        //height: 140,
        padding: 0,
        // margin : 0,
        height: 130,
        // width : '95%',
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-around',
        marginBottom : 10,
        borderWidth : 2,
        borderColor : 'black'
        // marginTop : 10,
      },
    
      deleteTextStyle: {
        fontSize: 14,
        color: '#fff'
      },
      picStyle: {
        width: 80,
        height: 80,
        borderRadius: 5,
        //backgroundColor : 'red'
      },
      ActiveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%',
        width: '28%',
        borderRadius: 15,
        backgroundColor: 'green'
      },
      CallBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
        width: '30%',
        borderRadius: 15,
        backgroundColor: '#076fed'
      },
      profileImage: {
        height: '95%',
        width: '28%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
      },
      profileDataContainer: {
        height: '95%',
        width: '68%',
        //backgroundColor : 'yellow',
        //justifyContent: 'space-evenly'
      },
      dataView: {
        height: '100%',
        backgroundColor: 'red',
        justifyContent: 'space-evenly',
      },
    
      nameContainer: {
        //flexDirection: 'row',
        //height: '23%',
        //alignItems: 'center',
        //alignSelf: 'flex-start'
      },
    
      nameText: {
        fontSize: 22,
        fontWeight : 'bold',
        marginLeft : 5,
        marginTop : 5,
      },
    
      ratetxt: {
        fontSize: 18,
        fontWeight : 'bold',
        color: 'black',
      },
    
      addressText: {
        fontSize: 14,
        color: 'grey',
        marginLeft: 5,
        marginRight: 5,
      },
    
      cityText: {
        fontSize: 16,
        color: 'grey',
        marginLeft: 5,
      },
    
      ratingTxt : {
        fontSize: 18,
        color: 'black',
        marginTop : 10,
        marginLeft: 5,
      },
    
      PhoneContainer: {
        //backgroundColor: 'red',
        //flexDirection: 'row',
        height: '23%',
        //alignItems: 'center',
        justifyContent: 'space-around'
      },
      phoneText: {
        fontSize: 14,
        color: 'grey'
      },

      cardHeader : {
          height : 30,
        //   width : '100%',
          backgroundColor : 'orange',
        //   alignItems : 'center',
          justifyContent : 'center',
        //   marginTop : 5,
      },
      verifiedText : {
          color : '#FFFFFF',
          
          marginLeft : 20,
          fontSize : 18,
          fontWeight : 'bold'
      }
    
})


