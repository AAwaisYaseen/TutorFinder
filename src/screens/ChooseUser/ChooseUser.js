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

class ChooseUser extends React.Component {
    render() {
        return (
            <View style={styles.ChooseUser}>

                <View style={{ height: 1 }}></View>

                <View style={styles.Container}>
                    <Image
                        source={require('../../assets/splash/logo.png')}
                        size={25}
                    />
                    <Text style={styles.chooseUsertxt}>
                        Tutor Finder is an App full with{'\n'}
                        tutors to help you out{'\n'}
                        on your academic Struggle.
                    </Text>
                </View>

                <View style={styles.BtnView}>
                    <TouchableOpacity style={styles.UserBtn}
                        onPress={() => this.props.navigation.navigate('TeacherNavigation')}
                    >
                        <Text style={styles.btnText}>I am a Teacher</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.UserBtn}
                        onPress={() => this.props.navigation.navigate('StudentNavigation')}
                    >
                        <Text style={styles.btnText}>I am a Student</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default ChooseUser;