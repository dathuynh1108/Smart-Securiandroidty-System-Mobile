import {FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {MenuView} from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {useEffect, useState} from "react";
import {styles} from "./styles";
// import {styles} from "./styles";


export default function ConfigurationIOTDetail ({navigation, route}) {
    console.log("config iot detailed: ", route.params);

    const [iotInfo, setIotInfo] = useState([]);


    useEffect(() => {
        setIotInfo(route.params);
    }, [route.params, iotInfo])


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Mã số:</Text>
                    <Text style={styles.iotConfigDetailRight}>{iotInfo.id}</Text>
                </View>

                <View style={styles.iotConfigDetailBlock}>
                    <Text style={styles.iotConfigDetailLeft}>Tên camera:</Text>
                    <Text style={styles.iotConfigDetailRight}>{iotInfo.name}</Text>
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
                    <Text style={styles.iotConfigDetailRight}>{iotInfo.iot_type}</Text>
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}