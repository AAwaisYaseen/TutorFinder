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
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerStudent from '../Drawer/DrawerStudent';
import DrawerTeacher from '../Drawer/DrawerTeacher';
import DrawerAdmin from '../Drawer/DrawerAdmin';

class AuthenticationUserType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
        }
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('@User_Type')
        this.setState({
            userType: value
        })
        console.log("UserType :", this.state.userType)
    }

    render() {
        const user = this.state.userType;

        if (user == 'teacher') {
            return (
                // <DrawerStudent />
                <DrawerTeacher />
            );
        } else if (user == 'student') {

            return (
                <DrawerStudent />
            );
        } else {
            return (
                <DrawerAdmin />
            )
        }



    }
}

export default AuthenticationUserType;