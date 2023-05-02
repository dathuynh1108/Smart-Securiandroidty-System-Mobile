import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../Welcome";

const Stack = createNativeStackNavigator();

export default function ApplicationStackScreen({ navigation, route }) {
    return (
        <Stack.Navigator initialRouteName="MainTabScreen"
                         screenOptions={{
                             headerTitleAlign: 'center',
                         }}
        >

            <Stack.Group>
                <Stack.Screen name="MainTabScreen" component={Welcome} options={{
                    headerShown: false
                }} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="Welcome" component={Welcome} options={{
                    headerShown: false
                }} />
            </Stack.Group>


        </Stack.Navigator>
    )
}
