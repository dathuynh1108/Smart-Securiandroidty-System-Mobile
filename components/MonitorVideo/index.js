import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import dataBuildings from '../../utils/dummyData/managementBuilding.json';
import dataFloors from '../../utils/dummyData/managementFloor.json';
import dataCamerasMap from '../../utils/dummyData/managementCameraDevice.json';
import dataIotsMap from '../../utils/dummyData/managementIOTDevice.json';
import dataCamerasConfig from '../../utils/dummyData/managementCameraDeviceConfig.json';
import VideoView from "../VideoView";
import { styles } from "./styles"
import { StyleSheet } from "react-native";

export default function MonitorVideo({ navigation }) {
    const [buildingsList, setBuildingsList] = useState([]);
    const [floorsList, setFloorsList] = useState([]);
    const [camerasMapList, setCamerasMapList] = useState([]);
    const [iotsMapList, setIotsMapList] = useState([]);
    const [camerasConfigList, setCamerasConfigList] = useState([]);
    const [videosList, setVideosList] = useState([]);


    const mapperVideo = (buildings, floors, camerasMap, iotsMap, camerasConfig) => {
        let results = [];
        for (let i = 0; i < camerasMap.length; i++) {
            if (camerasMap[i].connect_camera == "") continue;

            let building_name = '', floor_name = '', observe_iot_name = '', camera_name = '', camera_config_name = '', video_url = '';

            for (let j = 0; j < buildings.length; j++) {
                if (buildings[j].id == camerasMap[i].building_id) {
                    building_name = buildings[j].name;
                    break;
                }
            }

            if (camerasMap[i].floor_level == -1) {
                floor_name = 'Không thuộc tầng'
            } else {
                for (let j = 0; j < floors.length; j++) {
                    if (floors[j].building_id == camerasMap[i].building_id && floors[j].floor_level == camerasMap[i].floor_level) {
                        floor_name = floors[j].name;
                        break;
                    }
                }
            }


            for (let j = 0; j < camerasConfig.length; j++) {
                if (camerasMap[i].connect_camera == camerasConfig[j].id) {
                    video_url = camerasConfig[j].video_url;
                    break;
                }
            }

            camera_name = camerasMap[i].name;


            results.push({ building_name, floor_name, camera_name, video_url });
        }

        // console.log("result list videos: ", results);
        setVideosList(results);
    }

    useEffect(() => {

        let currentBuildings = dataBuildings;
        let currentFloors = dataFloors;
        let currentCamerasMap = dataCamerasMap;
        let currentIotsMap = dataIotsMap;
        let currentCamerasConfig = dataCamerasConfig;

        setBuildingsList(dataBuildings);
        setFloorsList(dataFloors);
        setCamerasMapList(dataCamerasMap);
        setIotsMapList(dataIotsMap);
        setCamerasConfigList(dataCamerasConfig);

        mapperVideo(currentBuildings, currentFloors, currentCamerasMap, currentIotsMap, currentCamerasConfig);
    }, [])

    return (
        <ScrollView style={styles.monitorVideoContainer}>
            <Text style={styles.title}>Giám sát camera</Text>

            {videosList && videosList.map((video, idx) => {
                return <View key={idx} style={styles.videoBlock}>
                    <Text style={styles.buildingAndFloorLeft}> <Text style={styles.titleBuildingAndFloor}>Tên tòa: </Text> {video.building_name}</Text>
                    <Text style={styles.buildingAndFloorLeft}> <Text style={styles.titleBuildingAndFloor}>Tên tầng: </Text> {video.floor_name}</Text>
                    <Text style={styles.cameraNameLeft}> <Text style={styles.titleBuildingAndFloor}>Tên camera: </Text> {video.camera_name}</Text>
                    <VideoView video_url={video.video_url} />
                    <View style={styles.bottomLine} />
                </View>
            })}

        </ScrollView>
    );
}