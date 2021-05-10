import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TeacherLogin from '../screens/TeacherLogin/TeacherLogin';
import RegisterTeacher from '../screens/RegisterTeacher/RegisterTeacher';
import TeacherHome from '../screens/TeacherHome/TeacherHome';
import DrawerTeacher from './Drawer/DrawerTeacher';
import PhoneVerification from '../screens/PhoneVerification/PhoneVerification';

const Stack = createStackNavigator();

function TeacherStack() {
    return (
        <Stack.Navigator initialRouteName="TeacherLogin">
            <Stack.Screen
                name="TeacherLogin"
                component={TeacherLogin}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="RegisterTeacher"
                component={RegisterTeacher}
            />

            <Stack.Screen
                name="PhoneVerification"
                component={PhoneVerification}
            />
            <Stack.Screen
                name="DrawerTeacher"
                component={DrawerTeacher}
                options={{
                    headerShown: false,
                }} />

        </Stack.Navigator>
    );
}

export default TeacherStack;
