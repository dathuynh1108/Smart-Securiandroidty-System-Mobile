import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { IoTTypeAPI } from "../../apis/IotTypeAPI";
// import {styles} from "./styles";


export default function ConfigurationIOTDetail({ navigation, route }) {
    // console.log("config iot detailed: ", route.params);

    const [iotInfo, setIotInfo] = useState([]);
    const [iotTypeName, setIotTypeName] = useState('');

    useEffect(() => {
        setIotInfo(route.params);
        // console.log("route.params: ", route.params)

        let iotTypes = [];
        IoTTypeAPI.getAll().then(res => {
            iotTypes = res.data.iot_device_types;
            for (let i = 0; i < iotTypes.length; i++) {
                if (route.params.iot_device_type && route.params.iot_device_type == iotTypes[i]._id) {
                    setIotTypeName(iotTypes[i].iot_device_type_name)
                    break;
                }
            }
        })

    }, [route.params, iotInfo])


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Mã số:</Text>
                    <Text style={styles.iotConfigDetailRight}>{iotInfo._id}</Text>
                </View>

                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Tên cảm biến:</Text>
                    <Text style={styles.iotConfigDetailRight}>{iotInfo.iot_device_name}</Text>
                </View>

                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Zone:</Text>
                    <Text style={styles.iotConfigDetailRight}>{iotInfo['zone']}</Text>
                </View>

                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Trạng thái:</Text>
                    <Text style={styles.iotConfigDetailRight}>{iotInfo.status}</Text>
                </View>

                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Loại cảm biến:</Text>
                    {/* <Text style={styles.iotConfigDetailRight}>{iotInfo.iot_type}</Text> */}
                    {
                        iotTypeName ?
                            <Text style={styles.iotConfigDetailRight}>{iotTypeName}</Text>
                            :
                            ''
                    }
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}