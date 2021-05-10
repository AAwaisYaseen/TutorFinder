import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';

class Splash extends React.Component {
    render() {
        setTimeout(() => {
            this.props.navigation.navigate('ChooseUser')
        },
            2000
        )
        return (
            <View style={styles.Splash}>

                <View style={{ height: 1 }}></View>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/splash/logo.png')}
                        size={25}
                    />
                    <Text style={styles.logotxt}>World's Most Loved Learning App</Text>
                </View>

                <Text style={styles.rightTxt}>Tutor Finder App 2020-21.All rights reserved.</Text>

            </View>
        );
    }
}

export default Splash;