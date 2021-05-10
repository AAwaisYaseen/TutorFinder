import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import StudentHome from '../screens/StudentHome/StudentHome';
import SearchTutor from '../screens/SearchTutor/SearchTutor';
import TeacherListing from '../screens/TeacherListing/TeacherListing';
import LiveLocation from '../screens/LiveLocationMaps/LiveLocationMaps';
import GiveFeedback from '../screens/GiveFeedback/GiveFeedback';
import ShowFeedback from '../screens/ShowFeedback/ShowFeedback';

const Stack = createStackNavigator();

function SearchStack() {
    return (
        <Stack.Navigator initialRouteName="SearchTutor">
            <Stack.Screen
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
                }} />

            <Stack.Screen
                name="GiveFeedback"
                component={GiveFeedback}
                />

            <Stack.Screen
                name="ShowFeedback"
                component={ShowFeedback}
                />
        </Stack.Navigator>
    );
}

export default SearchStack;