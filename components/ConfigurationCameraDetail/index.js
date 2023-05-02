import {FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {MenuView} from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {useEffect, useState} from "react";
import {styles} from "./styles";
// import {styles} from "./styles";


export default function ConfigurationCameraDetail ({navigation, route}) {
    console.log("config camera detailed: ", route.params);

    const [cameraInfo, setCameraInfo] = useState([]);


    useEffect(() => {
        setCameraInfo(route.params);
    }, [route.params, cameraInfo])


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.cameraConfigDetailBlock}>
                    <Text style={styles.cameraConfigDetailLeft}>Mã số:</Text>
                    <Text style={styles.cameraConfigDetailRight}>{cameraInfo.id}</Text>
                </View>

                <View style={styles.cameraConfigDetailBlock}>
                    <Text style={styles.cameraConfigDetailLeft}>Tên camera:</Text>
                    <Text style={styles.cameraConfigDetailRight}>{cameraInfo.name}</Text>
                </View>

                <View style={styles.cameraConfigDetailBlock}>
                    <Text style={styles.cameraConfigDetailLeft}>PTZ:</Text>
                    <Text style={styles.cameraConfigDetailRight}>{cameraInfo.ptz}</Text>
                </View>

                <View style={styles.cameraConfigDetailBlock}>
                    <Text style={styles.cameraConfigDetailLeft}>Trạng thái:</Text>
                    <Text style={styles.cameraConfigDetailRight}>{cameraInfo.status}</Text>
                </View>

                <View style={styles.cameraConfigDetailBlock}>
                    <Text style={styles.cameraConfigDetailLeft}>Độ phân giải:</Text>
                    <Text style={styles.cameraConfigDetailRight}>{cameraInfo.pixels}</Text>
                </View>

                <View style={styles.cameraConfigDetailBlock}>
                    <Text style={styles.cameraConfigDetailLeft}>Video:</Text>
                    <Text style={styles.cameraConfigDetailRight}>Chưa có</Text>
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}