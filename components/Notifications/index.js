// import { Dimensions, FlatList, Text, View } from "react-native";
import '../../styles/appStyles';
import dataNotifications from "../../utils/dummyData/notifications.json";
// import { useEffect, useState } from "react";
// import { styles } from "./styles";

import { Button, Text, View, FlatList, TouchableOpacity, ScrollView, Platform, TouchableHighlight } from "react-native";
// import dataEvents from '../../utils/dummyData/eventList.json';
// import dataIOTDevicesConfig from '../../utils/dummyData/managementIOTDeviceConfig.json';
// import cameraDevices from '../../utils/dummyData/managementCameraDevice.json';
// import iotDevices from '../../utils/dummyData/managementIOTDevice.json';
// import dataEventsType from '../../utils/dummyData/configurationEventType.json';
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "./styles";
import { TextInput } from "react-native-paper";
import { convertDate } from "../../utils/helper/helper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getEventsList } from "../../reducers/eventReducer";
import { BuildingAPI } from "../../apis/BuildingAPI";
import { IoTMapAPI } from "../../apis/IoTMapAPI";
import { CameraMapAPI } from "../../apis/CameraMapAPI";
import { IoTConfigAPI } from "../../apis/IoTConfigAPI";
import { CameraConfigAPI } from "../../apis/CameraConfigAPI";
import { EventAPI } from "../../apis/EventAPI";
import { AreaAPI } from "../../apis/AreaAPI";
import { IoTTypeAPI } from "../../apis/IotTypeAPI";
import { FloorAPI } from "../../apis/FloorAPI";
import { mapperListIOTTypeFromDatabaseToFE, mapperIOTConfigListFromDatabaseToFE, mapperListAreaFromDatabaseToFE, mapperListBuildingFromDatabaseToFE, mapperListCameraConfigurationFromDatabaseToFE, mapperListDeviceFromDatabaseToFE, mapperListFloorFromDatabaseToFE, mapperEventDetailFromDatabaseToFE, mapperListEventDetailFromDatabaseToFE } from "../../utils/mapper/configuration";
import { EventTypeAPI } from "../../apis/EventType";
import { useDispatch, useSelector } from "react-redux";
import { mapperEventsUtils } from "../../utils/mapper/mapperEvents";
import { useCallback } from "react";


export default function Notifications({ navigation }) {

    const [notificationsList, setNotificationsList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 3000);
    }, []);
    const FlatListItem = (item, index) => {
        return <View style={styles.eachNotificationBlock}>
            <Text style={styles.notificationName}>{item.event_name}</Text>

            <Text>
                Thời gian: {item.event_time}
            </Text>

            <Text>
                Vị trí: {item.address}
            </Text>
        </View>
    }


    useEffect(() => {
        // setNotificationsList(dataNotifications);

        let areas = [], buildings = [], floors = [], iotMaps = [], cameraMaps = [], events = [], eventTypes = [], newSeries = [], iotConfigs = [], cameraConfigs = [], iotTypes = []
        AreaAPI.getAll().then(res => {
            areas = res.data.areas;

            BuildingAPI.getAll().then(res => {
                buildings = res.data.areas;

                FloorAPI.getAll().then(res => {
                    floors = res.data.areas;

                    IoTMapAPI.getAll().then(res => {
                        iotMaps = res.data.iot_device_maps;

                        CameraMapAPI.getAll().then(res => {
                            cameraMaps = res.data.camera_maps;

                            IoTConfigAPI.getAll().then(res => {
                                iotConfigs = res.data.iot_devices;

                                CameraConfigAPI.getAll().then(res => {
                                    cameraConfigs = res.data.cameras

                                    EventAPI.getAll().then(res => {
                                        events = res.data.events;

                                        EventTypeAPI.getAll().then(res => {
                                            eventTypes = res.data.event_types;

                                            IoTTypeAPI.getAll().then(res => {
                                                iotTypes = res.data.iot_device_types;

                                                let mapperAreas = mapperListAreaFromDatabaseToFE(areas);
                                                let mapperBuildings = mapperListBuildingFromDatabaseToFE(buildings);
                                                let mapperFloors = mapperListFloorFromDatabaseToFE(floors, mapperBuildings);
                                                let devices = cameraMaps.concat(iotMaps);
                                                let mapperDevices = mapperListDeviceFromDatabaseToFE(devices, mapperAreas, mapperBuildings, mapperFloors)
                                                let mapperIoTMaps = mapperDevices.filter(item => item.type == 'iot')
                                                let mapperCameraMaps = mapperDevices.filter(item => item.type == 'camera')
                                                let mapperIoTConfigs = mapperIOTConfigListFromDatabaseToFE(iotConfigs);
                                                let mapperCameraConfigs = mapperListCameraConfigurationFromDatabaseToFE(cameraConfigs);
                                                let mapperIoTTypes = mapperListIOTTypeFromDatabaseToFE(iotTypes);
                                                // let mapperEvents = mapperListEventDetailFromDatabaseToFE(events)     // need to remove EventAPI get all
                                                let mapperEvents = mapperListEventDetailFromDatabaseToFE(events, mapperIoTConfigs)

                                                newSeries = [iotMaps.length, cameraMaps.length]


                                                // setAreasList(mapperAreas);
                                                // setBuildingsList(mapperBuildings);
                                                // setFloorsList(mapperFloors)
                                                // setIotDevices(mapperIoTMaps);           // map
                                                // setCameraDevices(mapperCameraMaps);     // map
                                                // setEventTypes(eventTypes);
                                                // setIotConfigurations(mapperIoTConfigs);
                                                // setIotsType(mapperIoTTypes)

                                                // setSeries(newSeries);
                                                // setMarkers(mapperAreas);
                                                // console.log("mapperDevices dashboard: ", mapperIoTMaps, mapperCameraMaps)
                                                // mapperRecentEvents(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps);
                                                let currentEventsList = mapperEventsUtils(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps, mapperAreas, mapperBuildings, mapperFloors, mapperIoTTypes, mapperEvents.length);
                                                // setEventsForFlatList(currentEventsList)

                                                setNotificationsList(currentEventsList)
                                                // console.log("currentEventsList: ", currentEventsList)

                                                // mapperIotTypes(mapperIoTTypes, mapperIoTConfigs);

                                                // handleDataForPieChart(mapperCameraMaps.length, mapperIoTMaps.length);
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }, [notificationsList, refreshing])


    return (
        <View style={styles.notificationContainer}>
            <FlatList
                style={styles.notificationFlatList}
                data={notificationsList}
                renderItem={({ item, index }) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => onRefresh()}
                refreshing={refreshing}
            >
            </FlatList>
        </View>

    );
}