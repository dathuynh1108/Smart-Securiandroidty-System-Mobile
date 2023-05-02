import {Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import '../../styles/appStyles'
import {appStyles} from "../../styles/appStyles";
import logo from "../../assets/hcmut.png";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../Dashboard";
import Configuration from "../Configuration";

const Tab = createMaterialTopTabNavigator();

export default function MainTabScreen({navigation}) {

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // if (route.name === "ClassroomsListScreen") {
                    //     iconName = focused ? "school" : "school";
                    // } else if (route.name === "Profile") {
                    //     iconName = focused ? "person" : "person";
                    // } else if (route.name === "MoreSettingsScreen") {
                    //     iconName = focused ? "settings" : "settings";
                    // }
                    return <Ionicons name={iconName} color={color} size={24} />
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#2E90FA',
                tabBarInactiveTintColor: 'grey',
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
            <Tab.Screen name="Event" component={Configuration} options={{ title: "Configuration" }} />
            <Tab.Screen name="Event" component={Configuration} options={{ title: "Configuration" }} />
        </Tab.Navigator>
    );
}