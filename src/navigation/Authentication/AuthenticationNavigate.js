import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, } from 'react-native';

import auth from '@react-native-firebase/auth';
import DrawerStudent from '../Drawer/DrawerStudent';
import DrawerTeacher from '../Drawer/DrawerTeacher';
import StackNavigation from '../StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationUserType from './AuthenticationUserType';

export default function AuthenticationNavigate() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    // const [userType, setUserType] = useState('student');

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        // async function fetchUserType() {
        //     const value = await AsyncStorage.getItem('@User_Type')
        //     setUserType(value);
        //     console.log("UserType :", value)
        // }
        // //Getting User Type here!
        // fetchUserType();
        // // fetch called here!.

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // auth.onAuthStateChanged called here.
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <StackNavigation />
        );
    }

    return (
        <AuthenticationUserType />
    );
    // else if (userType == 'student') {
    //     return (
    //         <DrawerStudent />
    //     );
    // }
    // else return (
    //     // <Text>{user.email}</Text>
    //     <DrawerTeacher />
    // );
}
