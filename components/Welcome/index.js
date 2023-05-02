import { Button, Text, View } from "react-native";
import '../../styles/appStyles'
import { appStyles } from "../../styles/appStyles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabScreen from "../MainTabScreen";
import Dashboard from "../Dashboard";
import Event from "../Event"
import Ionicons from "react-native-vector-icons/Ionicons";
import Configuration from "../Configuration";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Report from "../Report";
import Personal from "../Personal";
import Notifications from "../Notifications";
import VideoView from "../VideoView";
import MonitorVideo from "../MonitorVideo";
import { useEffect, useState } from "react";
import { EventAPI } from "../../apis/EventAPI";
import { useDispatch, useSelector } from "react-redux";
import { getEventsList, updateOriginalEventsList } from "../../reducers/eventReducer";
import VideoViewLivestream from "../VideoViewLivestream";

// const ip = require('ip');


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function Welcome({ navigation }) {

    // console.log("ip address: ", ip.address('localhost', 'ipv4'))

    const dispatch = useDispatch();
    const eventsListRedux = useSelector(state => state.event.eventsList);
    const originalEventsListRedux = useSelector(state => state.event.originalEventsList);
    const [eventsList, setEventsList] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [firstFetch, setFirstFetch] = useState([]);
    const handleSearchEventsListCallback = () => {
        console.log(convertDate(startDate))
        console.log(convertDate(endDate))
        let startDateObject = Date.parse(convertDate(startDate));
        let endDateObject = Date.parse(convertDate(endDate));

        // set events list
        // let currentEventsList = eventsList;
        let currentEventsList = originalEventsListRedux;
        // console.log("currentEventsList WELCOME: ", currentEventsList);
        currentEventsList = currentEventsList.filter((event, index) => {
            let date = event.created_at.substring(0, event.created_at.indexOf(','));
            let dateSplit = date.split('/');
            let dd = Platform.OS == 'ios' ? (dateSplit[0].length == 1 ? '0' + dateSplit[0] : dateSplit[0]) : (dateSplit[1].length == 1 ? '0' + dateSplit[1] : dateSplit[1]);
            let mm = Platform.OS == 'ios' ? (dateSplit[1].length == 1 ? '0' + dateSplit[1] : dateSplit[1]) : (dateSplit[0].length == 1 ? '0' + dateSplit[0] : dateSplit[0]);
            let yyyy = dateSplit[2];
            let eventDate = yyyy + '-' + mm + '-' + dd;
            console.log("event date: ", eventDate)
            let eventDateObject = Date.parse(eventDate);
            if (startDateObject <= eventDateObject && eventDateObject <= endDateObject) {
                return event;
            }
        })
        console.log("filtering date event: ", currentEventsList);
        // setEventsList(currentEventsList);
    }

    useEffect(() => {
        // if (firstFetch) {
        //     EventAPI.getAll().then(res => {
        //         console.log("eventst list WELCOME: ", res.data.events);
        //         setEventsList(res.data.events);
        //         setOriginalData(res.data.events);
        //     }).catch(err => {
        //         console.log("error: ", err);
        //     })

        //     setFirstFetch(false);
        // }

        EventAPI.getAll().then(res => {
            // console.log("eventst list WELCOME: ", res.data.events);
            dispatch(getEventsList(res.data.events));
            dispatch(updateOriginalEventsList(res.data.events));
            setEventsList(res.data.events);
            setOriginalData(res.data.events);
        }).catch(err => {
            console.log("error: ", err);
        })
    }, [])

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = "construct-outline";
                    if (route.name === "Dashboard") {
                        iconName = focused ? "speedometer" : "speedometer";
                    } else if (route.name === "Event") {
                        // iconName = focused ? "videocam" : "videocam";
                        iconName = focused ? "radio" : "radio";
                    } else if (route.name === "Configuration") {
                        iconName = focused ? "construct" : "construct";
                    } else if (route.name === "Report") {
                        iconName = focused ? "bar-chart" : "bar-chart";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person";
                    } else if (route.name === "Personal") {
                        iconName = focused ? "person-outline" : "person-outline";
                    } else if (route.name === "Notifications") {
                        iconName = focused ? "notifications" : "notifications";
                    } else if (route.name === "MonitorVideo") {
                        iconName = focused ? "videocam-outline" : "videocam-outline";
                    } else if (route.name === "VideoViewLivestream") {
                        iconName = focused ? "bandage-outline" : "bandage-outline";
                    }
                    return <Ionicons name={iconName} color={color} size={24} />
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#2E90FA',
                tabBarInactiveTintColor: 'grey',
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
            <Tab.Screen name="MonitorVideo" component={MonitorVideo} options={{ title: "MonitorVideo" }} />
            <Tab.Screen name="Event" component={Event} options={{ title: "Event" }} />
            {/* <Tab.Screen name="Configuration" component={Configuration} options={{ title: "Configuration" }} /> */}
            <Tab.Screen name="Report" component={Report} options={{ title: "Report" }} />
            {/*<Tab.Screen name="Profile" component={Report} options={{ title: "Profile" }} />*/}
            <Tab.Screen name="Notifications" component={Notifications} options={{ title: "Notifications" }} />
            <Tab.Screen name="Personal" component={Personal} options={{ title: "Personal" }} />
            <Tab.Screen name="VideoViewLivestream" component={VideoViewLivestream} options={{ title: "VideoViewLivestream" }} />
            {/* <Tab.Screen name="VideoView" component={VideoView} options={{ title: "VideoView" }} /> */}
        </Tab.Navigator>

    );
}