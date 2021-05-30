import { StyleSheet } from 'react-native';
import {
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

  headTitle : {
      fontSize : 26,
      fontWeight :'bold',
      fontStyle : 'italic',
      color : '#000000'
  },


  // is kah baad
  photoContainer: {
    //flex: 2.5,
    padding : 20,
    width : '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    //backgroundColor: '#f5f5f5',
    // backgroundColor : 'red',
    // marginBottom : 10
  },

  cardStyle: {
    //borderRadius: 12,
    elevation: 15,
    //height: 140,
    padding: 0,
    height: 80,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    marginBottom : 10,
    marginTop : 10,
  },

  deleteTextStyle: {
    fontSize: 14,
    color: '#fff'
  },
  picStyle: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
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
    marginLeft : 20,
    fontSize: 22,
    fontWeight : 'bold',
  },

  LatestMessageText: {
    marginLeft : 20,
    fontSize: 18,
    fontWeight : '400',
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
    marginTop : 20,
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
  titleView : {
      alignItems : 'center',
      justifyContent : 'center',
      width : '100%',
      padding : 20,
    //   backgroundColor : 'orange'
  }, 
  titleTxt : {
      fontSize : 26, 
      fontStyle : 'italic',
      fontWeight : 'bold', 
      color : 'orange'
  }
});