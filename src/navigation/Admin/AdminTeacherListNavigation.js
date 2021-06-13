import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ListTeachers from '../../screens/Admin/ListTeachers/ListTeachers';
import DetailsTeacher from '../../screens/Admin/DetailsTeacher/DetailsTeacher';
import FeedbackTeacher from '../../screens/Admin/FeedbackTeacher/FeedbackTeacher'
import VerificationBill from '../../screens/Admin/VerificationBill/VerificationBill';
const Stack = createStackNavigator();

function SearchStack() {
    return (
        <Stack.Navigator initialRouteName="ListTeachers">
            <Stack.Screen
                name="ListTeachers"
                component={ListTeachers}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="DetailsTeacher"
                component={DetailsTeacher}
            />
            <Stack.Screen
                name="FeedbackTeacher"
                component={FeedbackTeacher}
            />
            <Stack.Screen
                name="Verification"
                component={VerificationBill}
            />
        </Stack.Navigator>
    );
}

export default SearchStack;