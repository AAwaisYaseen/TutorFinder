import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import Splash from '../screens/Splash/Splash';
import ChooseUser from '../screens/ChooseUser/ChooseUser';;
import StudentLogin from '../screens/StudentLogin/StudentLogin';
import RegisterStudent from '../screens/RegisterStudent/RegisterStudent';
import StudentHome from '../screens/StudentHome/StudentHome';
import SearchTutor from '../screens/SearchTutor/SearchTutor';
import TeacherListing from '../screens/TeacherListing/TeacherListing';
import LiveLocation from '../screens/LiveLocationMaps/LiveLocationMaps';
import DrawerStudent from '../navigation/Drawer/DrawerStudent';
import PhoneVerification from '../screens/PhoneVerification/PhoneVerification'
// import AuthenticationNavigate from '../navigation/AuthenticationNavigate';
const Stack = createStackNavigator();

function StudentStack() {
    return (
        <Stack.Navigator initialRouteName="StudentLogin">
            <Stack.Screen
                name="StudentLogin"
                component={StudentLogin}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="RegisterStudent"
                component={RegisterStudent}
            />

            <Stack.Screen
                name="PhoneVerification"
                component={PhoneVerification}
            />

            <Stack.Screen
                name="DrawerStudent"
                component={DrawerStudent}
                options={{
                    headerShown: false,
                }} />

            {/* <Stack.Screen
                name="AuthenticationNavigate"
                component={AuthenticationNavigate}
                options={{
                    headerShown: false,
                }} /> */}

            {/* <Stack.Screen
                name="SearchTutor"
                component={SearchTutor}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="TeacherListing"
                component={TeacherListing}
            />
            <Stack.Screen
                name="StudentHome"
                component={StudentHome}
                options={{
                    headerShown: false,
                }} /> */}

            {/* <Stack.Screen
                name="Location"
                component={LiveLocation}
                options={{
                    headerShown: false,
                }} /> */}

        </Stack.Navigator>
    );
}

export default StudentStack;