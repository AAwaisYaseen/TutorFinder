import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ListStudents from '../../screens/Admin/ListStudents/ListStudents';
import DetailsStudent from '../../screens/Admin/DetailsStudent/DetailsStudent';
const Stack = createStackNavigator();

function SearchStack() {
    return (
        <Stack.Navigator initialRouteName="ListStudents">
            <Stack.Screen
                name="ListStudents"
                component={ListStudents}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="DetailsStudent"
                component={DetailsStudent}
            />
        </Stack.Navigator>
    );
}

export default SearchStack;