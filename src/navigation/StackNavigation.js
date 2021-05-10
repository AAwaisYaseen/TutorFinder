import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Splash from '../screens/Splash/Splash';
import ChooseUser from '../screens/ChooseUser/ChooseUser';
import TeacherLogin from '../screens/TeacherLogin/TeacherLogin';
import StudentLogin from '../screens/StudentLogin/StudentLogin';
import RegisterStudent from '../screens/RegisterStudent/RegisterStudent';
import StudentNavigation from '../navigation/StudentNavigation';
import TeacherNavigation from '../navigation/TeacherNavigation';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChooseUser"
                component={ChooseUser}
                options={{
                    headerShown: false,
                }} />

            <Stack.Screen
                name="StudentNavigation"
                component={StudentNavigation}
                options={{
                    headerShown: false,
                }} />

            <Stack.Screen
                name="TeacherNavigation"
                component={TeacherNavigation}
                options={{
                    headerShown: false,
                }} />



        </Stack.Navigator>
    );
}

export default MyStack;