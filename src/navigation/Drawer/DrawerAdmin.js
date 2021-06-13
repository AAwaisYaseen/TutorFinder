import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import Dashboard from '../../screens/Admin/Dashboard/Dashboard';
import ListTeachers from '../../screens/Admin/ListTeachers/ListTeachers';
import ListStudents from '../../screens/Admin/ListStudents/ListStudents';
import AdminTeacher from '../../navigation/Admin/AdminTeacherListNavigation';
import MapTeacher from '../../screens/Admin/MapTeacherLocation/MapTeacherLocation';
import MapStudent from '../../screens/Admin/MapStudentLocation/MapStudentLocation';
import AdminStudent from '../../navigation/Admin/AdminStudent'
import Directions from '../../screens/Admin/Directions';


async function SignOut() {
  await AsyncStorage.setItem('@User_Type', '')

  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!')
      // navigation.navigate("AuthenticationNavigate");
    });

}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={SignOut} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Teachers" component={AdminTeacher} />
      <Drawer.Screen name="Students" component={AdminStudent} />
      <Drawer.Screen name="Teachers Location" component={MapTeacher} />
      <Drawer.Screen name="Students Location" component={MapStudent} />
      <Drawer.Screen name="Directions" component={Directions} />




    </Drawer.Navigator>
  );
}