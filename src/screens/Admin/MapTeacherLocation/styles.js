import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const styles = StyleSheet.create({
    // Container : {
    //     height : '100%',
    // },

//     container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },

    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },

})