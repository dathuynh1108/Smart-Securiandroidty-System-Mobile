import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { appStyles } from "../../styles/appStyles";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
// import dataEvents from '../../utils/dummyData/eventList.json';
// import dataIOTDevicesConfig from '../../utils/dummyData/managementIOTDeviceConfig.json';
// import iotDevices from '../../utils/dummyData/managementCameraDevice.json';
// import cameraDevices from '../../utils/dummyData/managementIOTDevice.json';
// import dataBuildings from '../../utils/dummyData/managementBuilding.json';
// import dataEventsType from '../../utils/dummyData/configurationEventType.json';
import ImageModal from 'react-native-image-modal';
import { styles } from "./styles";
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
import { getEventsList } from "../../reducers/eventReducer";
import { mapperEventsUtils } from "../../utils/mapper/mapperEvents";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard({ route, navigation }) {
    // console.log("DASHBOARD: ", route.params.eventsList);
    // let eventsList = route.params.eventsList;

    const dispatch = useDispatch();
    const eventsListRedux = useSelector(state => state.event.eventsList);
    let eventsList = eventsListRedux;
    // console.log("eventsListRedux: ", eventsListRedux)
    const [iotDevicesMap, setIotDevicesMap] = useState([]);           // map
    const [cameraDevicesMap, setCameraDevicesMap] = useState([]);     // map
    const [buildingsList, setBuildingsList] = useState([]);
    const [recentEvents, setRecentEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [dataPieChart, setDataPieChart] = useState([]);
    const [iotDevices, setIotDevices] = useState([]);           // map
    const [cameraDevices, setCameraDevices] = useState([]);     // map
    const [areasList, setAreasList] = useState([]);
    // const [totalIotTypesInfo, setTotalIotTypesInfo] = useState([]);
    // const mapperRecentEvents = (events) => {
    //     // console.log("mapperRecentEvents: ", events)
    //     let devicesList = iotDevices.concat(cameraDevices);
    //     let latestEvents = [];
    //     for (let i = 0; i < 3; i++) {
    //         let zone = events[i]['zone'];
    //         let event_name = '', device_name = '', address = '', id_iot_config = '';
    //         for (let i = 0; i < dataIOTDevicesConfig.length; i++) {
    //             if (zone == dataIOTDevicesConfig[i]['zone']) {
    //                 // event_name = dataIOTDevicesConfig[i].event_name;
    //                 // device_name = dataIOTDevicesConfig[i].name;
    //                 // id_iot_config = dataIOTDevicesConfig[i].id;
    //                 // break;

    //                 let connect_event_type = dataIOTDevicesConfig[i]['connect_event_type'];
    //                 for (let j = 0; j < dataEventsType.length; j++) {
    //                     if (dataEventsType[j].id == connect_event_type) {
    //                         event_name = dataEventsType[j].event_name;
    //                         break;
    //                     }
    //                 }
    //                 device_name = dataIOTDevicesConfig[i].name;
    //                 id_iot_config = dataIOTDevicesConfig[i].id;
    //                 break;
    //             }
    //         }

    //         for (let i = 0; i < devicesList.length; i++) {
    //             if (devicesList[i].type == 'iot' && devicesList[i].connect_iot == id_iot_config) {
    //                 address = devicesList[i].address;
    //                 break;
    //             }
    //         }

    //         let created_at = new Date(events[i].created_at).toLocaleString();
    //         latestEvents.push({
    //             ...events[i],
    //             event_name,
    //             device_name,
    //             address,
    //             created_at,
    //             zone: zone,
    //             key: zone,
    //             video_url: 'https://caodang.fpt.edu.vn/wp-content/uploads/react-native.jpg'
    //         })
    //     }

    //     console.log("mapper event dashboard: ", latestEvents)
    //     setRecentEvents(latestEvents);
    // }
    // const mapperRecentEvents = (events, iotConfigs = [], eventTypes, iotMaps, cameraMaps) => {
    //     // console.log("events DASHBOARD: ", events)
    //     let devicesList = iotMaps.concat(cameraMaps);
    //     // console.log("devices list mapper recent event:", iotMaps, cameraMaps)
    //     let latestEvents = [];
    //     for (let i = 0; i < 3 && i < events.length; i++) {
    //         // console.log("events[i]: ", events[i])
    //         let zone = events[i]['zone'];
    //         let event_name = '', device_name = '', address = '', id_iot_config = '';
    //         for (let i = 0; i < iotConfigs.length; i++) {
    //             if (zone == iotConfigs[i]['zone']) {
    //                 // event_name = dataIotDevices[i].event_name;
    //                 // device_name = dataIotDevices[i].name;
    //                 // id_iot_config = dataIotDevices[i].id;
    //                 // break;

    //                 let connect_event_type = iotConfigs[i]['connect_event_type'];
    //                 for (let j = 0; j < eventTypes.length; j++) {
    //                     if (eventTypes[j].id == connect_event_type || eventTypes[j]._id == connect_event_type) {
    //                         event_name = eventTypes[j].event_name;
    //                         break;
    //                     }
    //                 }
    //                 device_name = iotConfigs[i].name;
    //                 id_iot_config = iotConfigs[i].id;
    //                 break;
    //             }
    //         }

    //         for (let i = 0; i < devicesList.length; i++) {
    //             if (devicesList[i].type == 'iot' && devicesList[i].connect_iot == id_iot_config) {
    //                 address = devicesList[i].address;
    //                 break;
    //             }
    //         }

    //         let created_at = new Date(events[i].created_at).toISOString();
    //         latestEvents.push({
    //             ...events[i],
    //             event_name,
    //             device_name,
    //             address,
    //             created_at,
    //             // zone: zone,
    //             key: events[i].id,
    //             // video_url: 'https://caodang.fpt.edu.vn/wp-content/uploads/react-native.jpg'
    //             video_url: events[i].detection_image_url ? events[i].detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg'
    //         })
    //     }

    //     // console.log("mapper event dashboard: ", latestEvents)
    //     setRecentEvents(latestEvents);
    //     // console.log("latestEvents: ", latestEvents)
    // }
    const handleDataForPieChart = (numCameras, numIots) => {
        const data = [
            {
                name: "Camera",
                population: numCameras,
                color: "#0BA5EC",
                legendFontColor: "#0BA5EC",
                legendFontSize: 15
            },
            {
                name: "Cảm biến",
                population: numIots,
                color: "#F63D68",
                legendFontColor: "#F63D68",
                legendFontSize: 15
            },
        ];
        setDataPieChart(data);
    }
    // const mapperIotTypes = (iotTypes, iotDevicesConfig) => {
    //     let iotTypeInfo = [];
    //     for (let i = 0; i < iotTypes.length; i++) {
    //         let iotDevicesOfType = [];
    //         for (let j = 0; j < iotDevicesConfig.length; j++) {
    //             if (iotDevicesConfig[j]["connect_iot_type"] == iotTypes[i]["id"]) {
    //                 iotDevicesOfType.push(iotDevicesConfig[j]);
    //             }
    //         }
    //         // console.log("type ", iotTypes[i].id, ": ", iotDevicesOfType)
    //         iotTypeInfo.push({ "size": iotDevicesOfType.length, "iot_type_name": iotTypes[i].iot_type_name, "image_url": iotTypes[i].image_url });
    //     }

    //     // console.log("iotTypeInfo: ", iotTypeInfo)
    //     setTotalIotTypesInfo(iotTypeInfo);
    // }


    useEffect(() => {
        /* call api to get dataBuildings, dataEvents, iotDevicesMap, cameraDevicesMap */

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
                                                let mapperEvents = mapperListEventDetailFromDatabaseToFE(eventsList, mapperIoTConfigs)

                                                newSeries = [iotMaps.length, cameraMaps.length]


                                                setAreasList(mapperAreas);
                                                setBuildingsList(mapperBuildings);
                                                setIotDevices(mapperIoTMaps);           // map
                                                setCameraDevices(mapperCameraMaps);     // map
                                                // setSeries(newSeries);
                                                // setMarkers(mapperAreas);
                                                // console.log("mapperDevices dashboard: ", mapperIoTMaps, mapperCameraMaps)
                                                // mapperRecentEvents(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps);
                                                let currentEventsList = mapperEventsUtils(mapperEvents, mapperIoTConfigs, eventTypes, mapperIoTMaps, mapperCameraMaps, mapperAreas, mapperBuildings, mapperFloors, mapperIoTTypes, 3);
                                                setRecentEvents(currentEventsList);

                                                // mapperIotTypes(mapperIoTTypes, mapperIoTConfigs);

                                                handleDataForPieChart(mapperCameraMaps.length, mapperIoTMaps.length);
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



        // let currentBuildings = dataBuildings;
        // let currentIotMap = iotDevices;
        // let currentCameraMap = cameraDevices;
        // let currentEvents = dataEvents;

        // setBuildingsList(currentBuildings);
        // setIotDevicesMap(currentIotMap);
        // setCameraDevicesMap(currentCameraMap);
        // setEvents(currentEvents);
        // mapperRecentEvents(dataEvents);
        // handleDataForPieChart(currentCameraMap.length, currentIotMap.length);
    }, [eventsListRedux])


    return (
        <ScrollView style={appStyles.appContainer}>
            <View style={styles.threeNumberBlock}>
                <View style={styles.eachBlock}>
                    <Text style={styles.numberOfEachBlock}> {areasList && areasList.length} </Text>
                    <Text style={styles.textOfEachBlock}> Khu vực </Text>
                </View>

                <View style={styles.eachBlockEvent}>
                    <Text style={styles.numberOfEachBlock}> {buildingsList.length} </Text>
                    <Text style={styles.textOfEachBlock}> Tòa nhà </Text>
                </View>

                <View style={styles.eachBlock}>
                    <Text style={styles.numberOfEachBlock}> {parseInt(iotDevices.length) + parseInt(cameraDevices.length)} </Text>
                    <Text style={styles.textOfEachBlock}> Thiết bị </Text>
                </View>
            </View>


            <View style={styles.pieChartContainer}>
                <PieChart
                    data={dataPieChart}
                    width={screenWidth}
                    height={220}
                    chartConfig={styles.chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 10]}
                    absolute
                />

            </View>


            <View style={styles.recentEventsContainer}>
                <Text style={styles.recentEventText}>Sự kiện gần đây</Text>

                {recentEvents && recentEvents.map((event, index) => {
                    let url = event.video_url;
                    return <View key={index}>
                        <View style={styles.recentEventBlock}>
                            <View>
                                <ImageModal
                                    resizeMode="contain"
                                    imageBackgroundColor="#000000"
                                    style={{ width: 150, height: 150, }}
                                    source={{ uri: url, }}
                                />
                            </View>
                            <View style={styles.recentEventInfoRight}>
                                <Text style={styles.eventName}>{event.event_name}</Text>
                                <Text style={styles.eventZone}>Zone: {event['zone']}</Text>
                                <Text style={styles.eventTime}>{event.created_at}</Text>
                                <Text style={styles.eventAddress}>Vị trí: {event.address}</Text>
                                <Text style={styles.eventDevice}>Phát hiện bởi: {event.device_name}</Text>
                            </View>
                        </View>

                    </View>

                })}

            </View>


        </ScrollView>
    );
}

// const data = [
//     {
//         name: "Camera",
//         population: 4,
//         color: "#0BA5EC",
//         // legendFontColor: "#7F7F7F",
//         legendFontColor: "#0BA5EC",
//         legendFontSize: 15
//     },
//     {
//         name: "Cảm biến",
//         population: 3,
//         color: "#F63D68",
//         // legendFontColor: "#7F7F7F",
//         legendFontColor: "#F63D68",
//         legendFontSize: 15
//     },
// ];