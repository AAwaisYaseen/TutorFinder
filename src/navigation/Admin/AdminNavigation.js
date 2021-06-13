import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Login from '../../screens/Admin/Login/Login';
import DrawerAdmin from '../Drawer/DrawerAdmin';

// import AuthenticationNavigate from '../navigation/AuthenticationNavigate';
const Stack = createStackNavigator();

function AdminStack() {
    return (
        <Stack.Navigator initialRouteName="AdminLogin">
            <Stack.Screen
                name="AdminLogin"
                component={Login}
                options={{
                    headerShown: false,
                }} />

            <Stack.Screen
                name="DrawerAdmin"
                component={DrawerAdmin}
                options={{
                    headerShown: false,
                }} />



        </Stack.Navigator>
    );
}

export default AdminStack;