import {FlatList, Platform, Text, TouchableOpacity, View} from "react-native";
import {MenuView} from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {useEffect, useState} from "react";
import {styles} from "./styles";
import dataIOTDevicesConfig from "../../utils/dummyData/managementIOTDeviceConfig.json";
import iotDevices from "../../utils/dummyData/managementCameraDevice.json";
import cameraDevices from "../../utils/dummyData/managementIOTDevice.json";


export default function ConfigurationCameraList ({navigation, camerasList}) {
    // console.log("config camera list: ", camerasList);

    const [data, setData] = useState([]);
    const FlatListItem = (item, index) => {
        // console.log("item flat list camera: ", item);
        return <TouchableOpacity onPress={() => navigation.navigate('ConfigurationCameraDetail', item)}>
            <View style={styles.itemBlock}>
                <Text style={styles.itemFirst}>{item.name}</Text>
                <Text style={styles.itemSecond}>{item.ptz}</Text>
                <Text style={styles.itemThird}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    }
    const FlatListHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerFirst}>Tên camera</Text>
                <Text style={styles.headerSecond}>PTZ</Text>
                <Text style={styles.headerThird}>Trạng thái</Text>
            </View>
        )
    }
    const mapperCamerasList = (camList) => {
        camList = camList.map((ele, key) => {
            let name = ele['name'];
            let ptz = ele['camera_type'] == 'PTZ' ? 'Có' : 'Không';
            let status = ele['status'] == 'free' ? 'Trống' : 'Đã sử dụng';
            return {...ele, name, ptz, status}
        })
        setData(camList);
    }


    useEffect(() => {
        mapperCamerasList(camerasList)
    }, [camerasList])


    return (
        <View style={styles.cameraListContainer}>
            <FlatList
                style={styles.flatListStyle}
                // data={camerasList}
                data={data}
                renderItem={({item, index}) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={FlatListHeader}
            >
            </FlatList>

        </View>
    );
}