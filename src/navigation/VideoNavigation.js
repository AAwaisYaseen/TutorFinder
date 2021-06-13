import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import VideoCallSession from '../screens/VideoCallSession/VideoCall';
import VideoChannel from '../screens/VideoChannel/VideoChannel';

const Stack = createStackNavigator();

function SearchStack() {
    return (
        <Stack.Navigator initialRouteName="VideoChannel">
            <Stack.Screen
                name="VideoChannel"
                component={VideoChannel}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="VideoCallSession"
                component={VideoCallSession}
                options={{
                    headerShown: false,
                }} />

        </Stack.Navigator>
    );
}

export default SearchStack;