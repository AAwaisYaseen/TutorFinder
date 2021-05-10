import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TeacherHome from '../../screens/TeacherHome/TeacherHome';
import auth from '@react-native-firebase/auth';
import DisplayFeedBackTeacherSide from '../../screens/DisplayFBTeacherSide/DisplayFBTeacherSide';
import ProfileTeacher from '../../screens/ProfileTeacher/ProfileTeacher'
import EditTeacherData from '../../screens/EditTeacherData/EditTeacherData';
import RequestHandling from '../../screens/RequestHandling/RequestHandling';
import ConnectionsTeacher from '../../screens/ConnectionsTeacher/ConnectionsTeacher'

async function SignOut() {
  // await AsyncStorage.setItem('@User_Type', '')

  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator initialRouteName='TeacherHome' drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={SignOut} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="TeacherHome" component={TeacherHome} />
      <Drawer.Screen name= "Feedback" component = {DisplayFeedBackTeacherSide} />
      <Drawer.Screen name= "Profile" component = {ProfileTeacher} />
      <Drawer.Screen name= "EditTeacherData" component = {EditTeacherData} />
      <Drawer.Screen name= "RequestHandling" component = {RequestHandling}/>
      <Drawer.Screen name= "Connections" component = {ConnectionsTeacher}/>

    </Drawer.Navigator>
  );
}