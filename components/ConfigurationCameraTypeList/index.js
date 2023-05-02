import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useEffect, useState } from "react";
import { styles } from "./styles";
import dataIOTDevicesConfig from "../../utils/dummyData/managementIOTDeviceConfig.json";
import iotDevices from "../../utils/dummyData/managementCameraDevice.json";
import cameraDevices from "../../utils/dummyData/managementIOTDevice.json";
import ImageModal from "react-native-image-modal";


export default function ConfigurationCameraTypeList({ navigation, cameraTypeConfigList }) {

    const [data, setData] = useState([]);
    const FlatListItem = (item, index) => {
        let url = item.image_url
        return <TouchableOpacity >
            <View style={styles.itemBlock}>
                <Text style={styles.itemFirst}>{item.camera_type_name}</Text>
                <Text style={styles.itemSecond}>{item.description}</Text>
                <TouchableOpacity>
                    <ImageModal
                        resizeMode="contain"
                        style={{ width: 70, height: '97%', }}
                        source={{ uri: url, }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    }
    const FlatListHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerFirst}>Tên loại camera</Text>
                <Text style={styles.headerSecond}>Mô tả</Text>
                <Text style={styles.headerThird}>Hình ảnh</Text>
            </View>
        )
    }

    useEffect(() => {
        setData(cameraTypeConfigList)
    }, [cameraTypeConfigList])


    return (
        <View style={styles.cameraListContainer}>
            <FlatList
                style={styles.flatListStyle}
                data={data}
                renderItem={({ item, index }) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={FlatListHeader}
            >
            </FlatList>

        </View>
    );
}