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
import { convertDate, sortEventOnCreatedAt } from "../../utils/helper/helper";
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
import { CameraTypeAPI } from "../../apis/CameraTypeAPI";
import * as socket from "socket.io-client";
import { BASE_URL, SOCKET_URL } from "../../constants/server";
import notifee from '@notifee/react-native';


export default function Event({ navigation }) {
    console.log("Event Page")

    const dispatch = useDispatch();
    const eventsListRedux = useSelector(state => state.event.eventsList);
    const originalEventsListRedux = useSelector(state => state.event.originalEventsList);
    let eventsList = eventsListRedux;
    const [originalData, setOriginalData] = useState([]);
    // const [eventsList, setEventsList] = useState([]);
    // const eventsListRedux = useSelector(state => state.event.eventsList);
    // const [configurationIOTsList, setConfigurationIOTsList] = useState([]);
    // const [devicesList, setDevicesList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    // const [showStartDate, setShowStartDate] = useState(false);
    const [showStartDate, setShowStartDate] = useState(Platform.OS == 'ios' ? true : false);
    const [endDate, setEndDate] = useState(new Date());
    // const [showEndDate, setShowEndDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(Platform.OS == 'ios' ? true : false);
    const [iotDevices, setIotDevices] = useState([]);           // map
    const [cameraDevices, setCameraDevices] = useState([]);     // map
    const [areasList, setAreasList] = useState([]);
    const [buildingsList, setBuildingsList] = useState([]);
    const [floorsList, setFloorsList] = useState([]);
    // const [totalIotTypesInfo, setTotalIotTypesInfo] = useState([]);
    const [eventsForFlatList, setEventsForFlatList] = useState([]);
    const [iotConfigurations, setIotConfigurations] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [iotTypes, setIotsType] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefreshEffect = useCallback((noti = false) => {
        setRefreshing(true);
        setTimeout(() => {

            setRefreshing(false);
        }, 3000);
    })

    const onRefresh = useCallback((noti = false) => {
        setRefreshing(true);
        setTimeout(() => {
            let areas = [], buildings = [], floors = [], iotMaps = [], cameraMaps = [], events = [], eventTypes = [], newSeries = [], iotConfigs = [], cameraConfigs = [], iotTypes = [], cameraTypes = [];

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

                                                    CameraTypeAPI.getAll().then(res => {
                                                        cameraTypes = res.data.camera_types;

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


                                                        setAreasList(mapperAreas);
                                                        setBuildingsList(mapperBuildings);
                                                        setFloorsList(mapperFloors)
                                                        setIotDevices(mapperIoTMaps);           // map
                                                        setCameraDevices(mapperCameraMaps);     // map
                                                        setEventTypes(eventTypes);
                                                        setIotConfigurations(mapperIoTConfigs);
                                                        setIotsType(mapperIoTTypes)
                                                        let currentEventsList = mapperEventsUtils(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps, mapperAreas, mapperBuildings, mapperFloors, mapperIoTTypes, mapperEvents.length, mapperCameraConfigs, cameraTypes);
                                                        let sortedEvents = sortEventOnCreatedAt(currentEventsList);
                                                        setEventsForFlatList(sortedEvents)
                                                        setFirstFetch(false);

                                                        if (noti) {
                                                            onDisplayNotification(sortedEvents[0]);
                                                        }
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
            })
            setRefreshing(false);
        }, 3000);
    }, []);
    const FlatListItem = (item, index) => {
        return <TouchableOpacity onPress={() => navigation.navigate('EventDetail', item,)}>
            <View style={styles.itemBlock}>
                <Text style={styles.itemFirst}>{item.event_name}</Text>
                <Text style={styles.itemSecond}>{item['zone']}</Text>
                <View style={styles.itemThird}>
                    {/* <Text> {item.event_time.split("T")[0]} </Text> */}
                    {/* <Text> {item.event_time.split("T")[0]} </Text>
                    <Text> {item.event_time.split("T")[1]} </Text> */}

                    <Text> {new Date(item.event_time).toLocaleString().split(",")[0]} </Text>
                    <Text> {new Date(item.event_time).toLocaleString().split(",")[1]} </Text>
                    {/* <Text> {item.event_time.split("T")[1]} </Text> */}
                </View>
            </View>
        </TouchableOpacity>
    }
    const FlatListHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerFirst}>Sự kiện</Text>
                <Text style={styles.headerSecond}>Zone</Text>
                <Text style={styles.headerThird}>Thời điểm</Text>
            </View>
        )
    }

    const onChangeStartDate = (event, selectedDate) => {
        if (event.type == "dismissed") {
            // setShowStartDate(false);
            Platform.OS == 'ios' ? setShowStartDate(true) : setShowStartDate(false);
            return;
        }
        // setShowStartDate(false);
        Platform.OS == 'ios' ? setShowStartDate(true) : setShowStartDate(false);
        setStartDate(selectedDate);

        // set events list
    };
    const onChangeEndDate = (event, selectedDate) => {
        if (event.type == "dismissed") {
            // setShowEndDate(false);
            Platform.OS == 'ios' ? setShowEndDate(true) : setShowEndDate(false);
            return;
        }
        // setShowEndDate(false);
        Platform.OS == 'ios' ? setShowEndDate(true) : setShowEndDate(false);
        setEndDate(selectedDate);

        // set events list
    };
    const onCancelStartDate = () => {
        console.log("cancel start date:");
        // setShowStartDate(false);
        Platform.OS == 'ios' ? setShowStartDate(true) : setShowStartDate(false);
    }
    const onCancelEndDate = () => {
        console.log("cancel end date:");
        // setShowEndDate(false);
        Platform.OS == 'ios' ? setShowEndDate(true) : setShowEndDate(false);
    }
    const handleResetEventsList = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        // setEventsList(originalData);
        // mapperEvents(originalData)


        onRefresh();
        // let currentEventsList = originalEventsListRedux;
        // let mapperEvents = mapperListEventDetailFromDatabaseToFE(currentEventsList, iotConfigurations);
        // // mapperRecentEvents(mapperEvents, iotConfigurations, eventTypes, iotDevices, cameraDevices);
        // let currentEventsListMapperUtils = mapperEventsUtils(mapperEvents, iotConfigurations, eventTypes, iotDevices, cameraDevices, areasList, buildingsList, floorsList, iotTypes, mapperEvents.length);
        // setEventsForFlatList(currentEventsListMapperUtils)
    }
    const helperDateISO = (date) => {
        let convertDate = new Date(date).toISOString();
        return convertDate.split('T')[0];
    }
    const handleSearchEventsList = () => {


        onRefreshEffect();


        console.log(convertDate(startDate))
        console.log(convertDate(endDate))
        let startDateObject = Date.parse(convertDate(startDate));
        let endDateObject = Date.parse(convertDate(endDate));


        let areas = [], buildings = [], floors = [], iotMaps = [], cameraMaps = [], events = [], eventTypes = [], newSeries = [], iotConfigs = [], cameraConfigs = [], iotTypes = [], cameraTypes = [];

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

                                                CameraTypeAPI.getAll().then(res => {
                                                    cameraTypes = res.data.camera_types;

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
                                                    // let mapperEvents = mapperListEventDetailFromDatabaseToFE(eventsList, mapperIoTConfigs)
                                                    let mapperEvents = mapperListEventDetailFromDatabaseToFE(events, mapperIoTConfigs)

                                                    newSeries = [iotMaps.length, cameraMaps.length]


                                                    setAreasList(mapperAreas);
                                                    setBuildingsList(mapperBuildings);
                                                    setFloorsList(mapperFloors)
                                                    setIotDevices(mapperIoTMaps);           // map
                                                    setCameraDevices(mapperCameraMaps);     // map
                                                    setEventTypes(eventTypes);
                                                    setIotConfigurations(mapperIoTConfigs);
                                                    setIotsType(mapperIoTTypes)
                                                    let currentEventsList = mapperEventsUtils(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps, mapperAreas, mapperBuildings, mapperFloors, mapperIoTTypes, mapperEvents.length, mapperCameraConfigs, cameraTypes);
                                                    let sortedEvents = sortEventOnCreatedAt(currentEventsList);
                                                    sortedEvents = sortedEvents.filter((event, index) => {

                                                        // let convertedCreatedAt = helperDateISO(event.created_at);
                                                        let convertedCreatedAt = helperDateISO(event.event_time);
                                                        let eventDateObject = Date.parse(convertedCreatedAt);
                                                        if (startDateObject <= eventDateObject && eventDateObject <= endDateObject) {
                                                            return event;
                                                        }
                                                    })


                                                    setEventsForFlatList(sortedEvents)
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
        })





        // console.log(convertDate(startDate))
        // console.log(convertDate(endDate))
        // let startDateObject = Date.parse(convertDate(startDate));
        // let endDateObject = Date.parse(convertDate(endDate));

        // // set events list
        // // let currentEventsList = eventsList;
        // let currentEventsList = originalEventsListRedux;
        // // console.log("currentEventsList EVENT: ", currentEventsList)
        // currentEventsList = currentEventsList.filter((event, index) => {

        //     // let convertedCreatedAt = helperDateISO(event.created_at);
        //     let convertedCreatedAt = helperDateISO(event.event_time);
        //     let eventDateObject = Date.parse(convertedCreatedAt);
        //     if (startDateObject <= eventDateObject && eventDateObject <= endDateObject) {
        //         return event;
        //     }
        // })
        // // console.log("filtering date event: ", currentEventsList.length);
        // // console.log("filtering date event: ", currentEventsList);

        // let mapperEvents = mapperListEventDetailFromDatabaseToFE(currentEventsList, iotConfigurations);
        // // mapperRecentEvents(mapperEvents, iotConfigurations, eventTypes, iotDevices, cameraDevices);
        // let currentEventsListMapperUtils = mapperEventsUtils(mapperEvents, iotConfigurations, eventTypes, iotDevices, cameraDevices, areasList, buildingsList, floorsList, iotTypes, mapperEvents.length);
        // setEventsForFlatList(currentEventsListMapperUtils)

        // setEventsList(currentEventsList);
    }



    const [connectSocket, setConnectSocket] = useState(false);
    const [firstFetch, setFirstFetch] = useState(true);
    const [io, setIo] = useState(null);
    const [idEvents, setIdEvents] = useState({});

    async function onDisplayNotification(event = {}) {
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.requestPermission();

        // Sometime later...
        await notifee.displayNotification({
            id: event._id,
            title: event.event_name,
            body: new Date(event.event_time).toLocaleString() + ', ' + event.address,
            android: {
                channelId,
            },
        });
        // count += 1;
    }

    useEffect(() => {


        if (firstFetch) {
            let areas = [], buildings = [], floors = [], iotMaps = [], cameraMaps = [], events = [], eventTypes = [], newSeries = [], iotConfigs = [], cameraConfigs = [], iotTypes = [], cameraTypes = [];

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

                                                    CameraTypeAPI.getAll().then(res => {
                                                        cameraTypes = res.data.camera_types;

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
                                                        // let mapperEvents = mapperListEventDetailFromDatabaseToFE(eventsList, mapperIoTConfigs)
                                                        let mapperEvents = mapperListEventDetailFromDatabaseToFE(events, mapperIoTConfigs)

                                                        newSeries = [iotMaps.length, cameraMaps.length]


                                                        setAreasList(mapperAreas);
                                                        setBuildingsList(mapperBuildings);
                                                        setFloorsList(mapperFloors)
                                                        setIotDevices(mapperIoTMaps);           // map
                                                        setCameraDevices(mapperCameraMaps);     // map
                                                        setEventTypes(eventTypes);
                                                        setIotConfigurations(mapperIoTConfigs);
                                                        setIotsType(mapperIoTTypes)
                                                        let currentEventsList = mapperEventsUtils(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps, mapperAreas, mapperBuildings, mapperFloors, mapperIoTTypes, mapperEvents.length, mapperCameraConfigs, cameraTypes);
                                                        let sortedEvents = sortEventOnCreatedAt(currentEventsList);
                                                        setEventsForFlatList(sortedEvents)
                                                        setFirstFetch(false);
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
            })
        }


        if (!connectSocket) {
            setIo(socket.connect(SOCKET_URL));
            setConnectSocket(true);
        }


        io && io.on("event_new", (message = "") => {
            message = JSON.parse(message);
            let obj;
            if (idEvents[message._id] == undefined || idEvents[message.id] == undefined) {
                obj = idEvents;
                obj[message.id] = 1;
                obj[message._id] = 1;
                // onDisplayNotification(message)
                onRefresh(true);
            }
        })


        io && io.on("event_verified", (message = "") => {
            message = JSON.parse(message);
            let obj;
            if (idEvents[message._id] == undefined || idEvents[message.id] == undefined) {
                obj = idEvents;
                obj[message.id] = 1;
                obj[message._id] = 1;
                onRefresh(true);
            } else {
                onRefresh(true);
            }
        })



        // let areas = [], buildings = [], floors = [], iotMaps = [], cameraMaps = [], events = [], eventTypes = [], newSeries = [], iotConfigs = [], cameraConfigs = [], iotTypes = [], cameraTypes = [];
        // AreaAPI.getAll().then(res => {
        //     areas = res.data.areas;

        //     BuildingAPI.getAll().then(res => {
        //         buildings = res.data.areas;

        //         FloorAPI.getAll().then(res => {
        //             floors = res.data.areas;

        //             IoTMapAPI.getAll().then(res => {
        //                 iotMaps = res.data.iot_device_maps;

        //                 CameraMapAPI.getAll().then(res => {
        //                     cameraMaps = res.data.camera_maps;

        //                     IoTConfigAPI.getAll().then(res => {
        //                         iotConfigs = res.data.iot_devices;

        //                         CameraConfigAPI.getAll().then(res => {
        //                             cameraConfigs = res.data.cameras

        //                             EventAPI.getAll().then(res => {
        //                                 events = res.data.events;

        //                                 EventTypeAPI.getAll().then(res => {
        //                                     eventTypes = res.data.event_types;

        //                                     IoTTypeAPI.getAll().then(res => {
        //                                         iotTypes = res.data.iot_device_types;

        //                                         CameraTypeAPI.getAll().then(res => {
        //                                             cameraTypes = res.data.camera_types;

        //                                             let mapperAreas = mapperListAreaFromDatabaseToFE(areas);
        //                                             let mapperBuildings = mapperListBuildingFromDatabaseToFE(buildings);
        //                                             let mapperFloors = mapperListFloorFromDatabaseToFE(floors, mapperBuildings);
        //                                             let devices = cameraMaps.concat(iotMaps);
        //                                             let mapperDevices = mapperListDeviceFromDatabaseToFE(devices, mapperAreas, mapperBuildings, mapperFloors)
        //                                             let mapperIoTMaps = mapperDevices.filter(item => item.type == 'iot')
        //                                             let mapperCameraMaps = mapperDevices.filter(item => item.type == 'camera')
        //                                             let mapperIoTConfigs = mapperIOTConfigListFromDatabaseToFE(iotConfigs);
        //                                             let mapperCameraConfigs = mapperListCameraConfigurationFromDatabaseToFE(cameraConfigs);
        //                                             let mapperIoTTypes = mapperListIOTTypeFromDatabaseToFE(iotTypes);
        //                                             // let mapperEvents = mapperListEventDetailFromDatabaseToFE(events)     // need to remove EventAPI get all
        //                                             let mapperEvents = mapperListEventDetailFromDatabaseToFE(eventsList, mapperIoTConfigs)

        //                                             newSeries = [iotMaps.length, cameraMaps.length]


        //                                             setAreasList(mapperAreas);
        //                                             setBuildingsList(mapperBuildings);
        //                                             setFloorsList(mapperFloors)
        //                                             setIotDevices(mapperIoTMaps);           // map
        //                                             setCameraDevices(mapperCameraMaps);     // map
        //                                             setEventTypes(eventTypes);
        //                                             setIotConfigurations(mapperIoTConfigs);
        //                                             setIotsType(mapperIoTTypes)
        //                                             let currentEventsList = mapperEventsUtils(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps, mapperAreas, mapperBuildings, mapperFloors, mapperIoTTypes, mapperEvents.length, mapperCameraConfigs, cameraTypes);
        //                                             let sortedEvents = sortEventOnCreatedAt(currentEventsList);
        //                                             setEventsForFlatList(sortedEvents)
        //                                         })

        //                                     })
        //                                 })
        //                             })
        //                         })
        //                     })
        //                 })
        //             })
        //         })
        //     })
        // })
    }, [eventsListRedux, refreshing, eventsForFlatList, firstFetch]);


    return (
        <View style={styles.eventContainer}>

            <View style={styles.startDateContainer}>
                <Text style={styles.startDate}>Ngày bắt đầu: </Text>

                {Platform.OS == 'ios' ?
                    ''
                    :
                    <View style={{ display: "flex", flexDirection: 'row', }}>
                        <TextInput
                            style={styles.startDateInput}
                            disabled={true}
                            value={startDate.getDate() + "/" + (parseInt(startDate.getMonth()) + 1).toString() + "/" + startDate.getFullYear()}
                        />

                        <Ionicons
                            onPress={() => {
                                setShowStartDate(true)
                            }}
                            style={{ justifyContent: "center", textAlignVertical: "center", marginLeft: -30 }}
                            name='calendar-outline' size={20}
                        />
                    </View>
                }

                {showStartDate && <DateTimePicker
                    style={styles.startDateLib}
                    testID="dateTimePicker"
                    value={startDate}
                    mode='date'
                    is24Hour={true}
                    onChange={onChangeStartDate}
                    onTouchCancel={onCancelStartDate}
                />}
            </View>


            <View style={styles.endDateContainer}>
                <Text style={styles.endDate}>Ngày kết thúc: </Text>

                {Platform.OS == 'ios' ?
                    ''
                    :
                    <View style={{ display: "flex", flexDirection: 'row', }}>
                        <TextInput
                            style={styles.endDateInput}
                            disabled={true}
                            value={endDate.getDate() + "/" + (parseInt(endDate.getMonth()) + 1).toString() + "/" + endDate.getFullYear()}
                        />

                        <Ionicons
                            onPress={() => {
                                setShowEndDate(true)
                            }}
                            style={{ justifyContent: "center", textAlignVertical: "center", marginLeft: -30 }}
                            name='calendar-outline' size={20}
                        />
                    </View>

                }


                {showEndDate && <DateTimePicker
                    style={styles.endDateLib}
                    testID="dateTimePicker"
                    value={endDate}
                    mode='date'
                    is24Hour={true}
                    onChange={onChangeEndDate}
                    onTouchCancel={onCancelEndDate}
                />}

            </View>

            <View style={styles.containerSearchAndButton}>

                <TouchableHighlight style={styles.resetTouchable}
                    onPress={handleResetEventsList}
                    underlayColor="#fff"
                >
                    <Text>Reset</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.searchTouchable}
                    onPress={handleSearchEventsList}
                    underlayColor="#fff"
                >
                    <Text>Tìm kiếm</Text>
                </TouchableHighlight>

            </View>


            <FlatList
                style={styles.flatListStyle}
                data={eventsForFlatList}
                // data={eventsListRedux}
                renderItem={({ item, index }) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={FlatListHeader}
                onRefresh={() => onRefresh()}
                refreshing={refreshing}
            >
            </FlatList>


        </View>
    );
}