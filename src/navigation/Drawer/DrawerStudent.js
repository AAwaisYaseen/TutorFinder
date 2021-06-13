import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import SearchTutor from '../../screens/SearchTutor/SearchTutor';
import LiveLocation from '../../screens/LiveLocationMaps/LiveLocationMaps';
import SearchNavigation from '../SearchNavigation';
import StudentChatNavigation from '../Communication/StudentChatNavigation';
import Notifications from '../../screens/Notifications';
import GiveFeedback from '../../screens/GiveFeedback/GiveFeedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ProfileStudent from '../../screens/ProfileStudent/ProfileStudent';
import EditStudentData from '../../screens/EditStudentData/EditStudentData';
import ConnectionsStudent from '../../screens/ConnectionsStudent/ConnectionsStudent';
import DashboardStudent from '../../screens/DashboardStudent/DashboardStudent';
import Video from '../../navigation/VideoNavigation';


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
    <Drawer.Navigator initialRouteName='DashboardStudent' drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={SignOut} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="DashboardStudent" component={DashboardStudent} />
      <Drawer.Screen name="SearchNavigation" component={SearchNavigation} />
      <Drawer.Screen name="LiveLocation" component={LiveLocation} />
      {/* <Drawer.Screen name="Notifications" component={Notifications} /> */}
      <Drawer.Screen name="ProfileStudent" component={ProfileStudent} />
      <Drawer.Screen name="EditStudentData" component={EditStudentData} />
      {/* <Drawer.Screen name="ConnectionsStudent" component={ConnectionsStudent} /> */}
      <Drawer.Screen name="Connections" component={StudentChatNavigation} />
      <Drawer.Screen name="Video Session" component={Video} />





      {/* <Drawer.Screen name="GiveFeedback" component={GiveFeedback} /> */}
    </Drawer.Navigator>
  );
}