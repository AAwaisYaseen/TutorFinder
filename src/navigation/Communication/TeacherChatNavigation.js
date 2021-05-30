import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ConnectionsTeacher from '../../screens/ConnectionsTeacher/ConnectionsTeacher';
import ChatTeacher from '../../screens/ChatTeacher/ChatTeacher';

const Stack = createStackNavigator();

function StudentChat() {
    return (
        <Stack.Navigator initialRouteName="ConnectionsStudent">
            <Stack.Screen
                name="ConnectionsTeacher"
                component={ConnectionsTeacher}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="ChatTeacher"
                component={ChatTeacher}
                options={{
                    title: 'Messages'
                }}
                // options={({ route }) => ({
                //     title: route.params.thread.name
                // })}
            />
        </Stack.Navigator>
    );
}

export default StudentChat;