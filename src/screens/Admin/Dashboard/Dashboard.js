import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { Header } from 'react-native-elements';




class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{
                        icon: 'menu', color: '#fff',
                        onPress: () => this.props.navigation.toggleDrawer()
                    }}
                    centerComponent={{ text: 'Admin Dashboard', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}

                />
                <View style={{ flex: 1 }}>
                    <Text>Dashboard</Text>
                </View>
            </View>
        );
    }
}

export default Dashboard;