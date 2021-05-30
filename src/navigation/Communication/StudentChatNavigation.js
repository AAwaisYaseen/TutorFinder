import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ConnectionsStudent from '../../screens/ConnectionsStudent/ConnectionsStudent';
import ChatStudent from '../../screens/ChatStudent/ChatStudent';

const Stack = createStackNavigator();

function StudentChat() {
    return (
        <Stack.Navigator initialRouteName="ConnectionsStudent">
            <Stack.Screen
                name="ConnectionsStudent"
                component={ConnectionsStudent}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="ChatStudent"
                component={ChatStudent}
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